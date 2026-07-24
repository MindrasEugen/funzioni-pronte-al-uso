# Gestione Archivio Locale

> Wrapper JavaScript per interagire in totale sicurezza con l'archivio locale del browser, con gestione automatica della serializzazione JSON e prevenzione delle eccezioni.

---

## 📖 Descrizione

L'API nativa `localStorage` consente di memorizzare coppie chiave-valore nel browser. Tuttavia, presenta due limiti principali nello sviluppo reale:
1. Supporta solo stringhe. Se si desidera salvare array o oggetti complessi, è necessario effettuare manualmente `JSON.stringify` e `JSON.parse`.
2. Può lanciare eccezioni fatali (bloccando lo script) in scenari come: navigazione in incognito in determinati browser, cookie disabilitati dalle preferenze dell'utente o superamento della quota di memoria disponibile (solitamente 5MB).

Questa utility risolve entrambi i problemi in modo trasparente.

---

## 🛠️ Funzioni Esportate

### `salvaInArchivio(chiave, valore)`
Salva un elemento di qualsiasi tipo nell'archivio locale (convertendolo automaticamente in stringa JSON).
- **`chiave`** *(String)*: La chiave con cui salvare il dato.
- **`valore`** *(Any)*: Qualsiasi tipo di dato serializzabile (Array, Object, String, Number, Boolean, ecc.).
- **Ritorna**: `true` se il salvataggio è riuscito, `false` se si è verificato un errore.

### `recuperaDaArchivio(chiave, valoreDefault)`
Recupera e deserializza un valore dall'archivio locale.
- **`chiave`** *(String)*: La chiave da cercare.
- **`valoreDefault`** *(Any)*: Valore restituito se la chiave non esiste o se si verifica un errore (default: `null`).
- **Ritorna**: Il valore memorizzato opportunamente tipizzato, oppure `valoreDefault`.

### `rimuoviDaArchivio(chiave)`
Rimuove una specifica chiave dall'archivio locale.
- **`chiave`** *(String)*: La chiave da rimuovere.
- **Ritorna**: `true` se l'operazione è riuscita, `false` altrimenti.

### `svuotaArchivio()`
Svuota completamente l'archivio locale associato al dominio dell'applicazione.
- **Ritorna**: `true` se lo svuotamento è riuscito, `false` altrimenti.

---

## 💻 Esempi di Utilizzo

### JavaScript Vanilla

```javascript
import { salvaInArchivio, recuperaDaArchivio, rimuoviDaArchivio } from "./js/storageHelper.js";

// Salvare un oggetto complesso
const preferenze = { tema: "dark", font: "Inter", notifiche: true };
salvaInArchivio("user_prefs", preferenze);

// Recuperare l'oggetto in un secondo momento
const prefsSalvate = recuperaDaArchivio("user_prefs", { tema: "light" });
console.log(prefsSalvate.tema); // "dark" (recuperato come oggetto nativo)

// Rimozione della chiave
rimuoviDaArchivio("user_prefs");
```

### React (Custom Hook `useLocalStorage`)

Nelle applicazioni React, questo helper è perfetto per implementare uno stato persistente che non si perde al ricaricamento della pagina, gestito tramite un custom Hook:

```jsx
import { useState } from 'react';
import { recuperaDaArchivio, salvaInArchivio } from './js/storageHelper';

export function useArchivioLocale(key, initialValue) {
  // Passiamo una funzione a useState per eseguire il caricamento iniziale una sola volta
  const [storedValue, setStoredValue] = useState(() => {
    return recuperaDaArchivio(key, initialValue);
  });

  // Wrapper di setter che aggiorna sia lo stato React sia l'archivio locale
  const setValue = (value) => {
    try {
      // Supporta sia un valore diretto che una funzione di callback (come il setter nativo)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      salvaInArchivio(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// === Utilizzo nel Componente React ===
function App() {
  const [theme, setTheme] = useLocalStorage("app_theme", "light");

  return (
    <div className={`app ${theme}`}>
      <p>Il tema attuale è {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Cambia Tema
      </button>
    </div>
  );
}
```

---

## 🔬 Dettagli Tecnici ed Eccezioni Gestite

Le funzioni incapsulano i comandi in blocchi `try...catch` per impedire crash dello script principale dovuti a:
- **`QuotaExceededError`**: Raggiungimento del limite di memoria disponibile su disco (solitamente circa 5-10 MB).
- **Restrizioni di Privacy**: Browser impostati per bloccare i cookie o l'archiviazione locale (es. Safari in navigazione privata o configurazioni aziendali stringenti).
- **Server Side Rendering (SSR)**: Nelle app Next.js o framework simili, l'oggetto `window` non è definito sul server. Il blocco try/catch evita errori a tempo di compilazione/render lato server (SSR).
