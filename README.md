# Funzioni Salvate

> Una raccolta di funzioni JavaScript utili per lo sviluppo web, ognuna con la propria struttura completa: codice, demo interattiva e documentazione dettagliata.

## 📁 Struttura della Repository

```
funzioni salvate/
├── README.md                  # Questo file - panoramica generale
├── cambia-colore/
│   ├── js/
│   │   └── colorChanger.js   # Cambia colore sfondo elementi
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
├── numero-casuale/
│   ├── js/
│   │   └── randomNumber.js   # Genera numeri casuali in un intervallo
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
├── selettore-rapido/
│   ├── js/
│   │   └── shortcut.js       # Shortcut per querySelector ($)
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
├── crea-elemento/
│   ├── js/
│   │   └── createElement.js  # Crea elementi DOM con parametri
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
├── on-listener/
│   ├── js/
│   │   └── eventListener.js  # Shortcut per addEventListener
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
├── log-color/
│   ├── js/
│   │   └── colorLogger.js    # Stampa messaggi colorati in console
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
└── fade-in/
    ├── js/
    │   └── animations.js      # Effetto fade-in su elementi
    ├── css/
    │   └── styles.css        # Stili per la demo
    ├── index.html            # Demo interattiva
    └── README.md             # Documentazione dettagliata
│
├── debounce-throttle/
│   ├── js/
│   │   └── debounceThrottle.js # Ottimizzazione frequenza (debounce/throttle)
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
├── gestisci-storage/
│   ├── js/
│   │   └── storageHelper.js  # Wrapper sicuro per l'archivio locale
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
│
├── formato-data/
│   ├── js/
│   │   └── formatDate.js     # Formattazione date e tempo relativo
│   ├── css/
│   │   └── styles.css        # Stili per la demo
│   ├── index.html            # Demo interattiva
│   └── README.md             # Documentazione dettagliata
```

## 🎯 Elenco Funzioni

### 🎨 Manipolazione Visiva e Animazioni
- **🌈 [`cambiaColore(elemento)`](cambia-colore/README.md)** — Cambia il colore di sfondo di un elemento HTML in modo casuale
  [👉 Demo](cambia-colore/index.html) · [📖 Doc](cambia-colore/README.md)

- **🎭 [`fadeIn(elemento, durata)`](fade-in/README.md)** — Applica un effetto fade-in (dissolvenza in entrata) a un elemento
  [👉 Demo](fade-in/index.html) · [📖 Doc](fade-in/README.md)

---

### 🔢 Utility e Generatori
- **🎲 [`numeroCasuale(min, max)`](numero-casuale/README.md)** — Genera un numero intero casuale compreso tra min e max (inclusi)
  [👉 Demo](numero-casuale/index.html) · [📖 Doc](numero-casuale/README.md)

- **🖨️ [`logColor(msg, colore)`](log-color/README.md)** — Stampa un messaggio colorato nella console del browser
  [👉 Demo](log-color/index.html) · [📖 Doc](log-color/README.md)

- **⏱️ [`debounce(fn, delay)`](debounce-throttle/README.md) / [`throttle(fn, limit)`](debounce-throttle/README.md)** — Ottimizzazione della frequenza di chiamata per funzioni ad alta frequenza
  [👉 Demo](debounce-throttle/index.html) · [📖 Doc](debounce-throttle/README.md)

- **💾 [`salvaInArchivio(chiave, valore)`](gestisci-storage/README.md) / [`recuperaDaArchivio(chiave, default)`](gestisci-storage/README.md)** — Interazione sicura e tipizzata con l'archivio locale
  [👉 Demo](gestisci-storage/index.html) · [📖 Doc](gestisci-storage/README.md)

- **📅 [`formattaData(data, stile)`](formato-data/README.md) / [`tempoRelativo(data)`](formato-data/README.md)** — Formattazione data localizzata e tempo trascorso colloquiale
  [👉 Demo](formato-data/index.html) · [📖 Doc](formato-data/README.md)

---

### ⚡ Shortcut DOM e Gestione Eventi
- **🔍 [`$ (selettore)`](selettore-rapido/README.md)** — Shortcut per `document.querySelector()`
  [👉 Demo](selettore-rapido/index.html) · [📖 Doc](selettore-rapido/README.md)

- **➕ [`crea(tag, classe, testo)`](crea-elemento/README.md)** — Crea un nuovo elemento HTML con parametri opzionali
  [👉 Demo](crea-elemento/index.html) · [📖 Doc](crea-elemento/README.md)

- **📡 [`on(elemento, evento, callback)`](on-listener/README.md)** — Shortcut per `addEventListener()`
  [👉 Demo](on-listener/index.html) · [📖 Doc](on-listener/README.md)

## 🚀 Come Usare

### 1. Esplorare le funzioni
Ogni cartella contiene:
- **`js/`**: File JavaScript con la funzione implementata
- **`css/`**: Stili CSS per la pagina demo
- **`index.html`**: Pagina HTML di dimostrazione interattiva
- **`README.md`**: Documentazione dettagliata con esempi, parametri e casi d'uso

### 2. Testare una funzione
Apri semplicemente il file `index.html` della funzione che ti interessa in un browser:
```bash
# Esempio per testare la funzione cambiaColore
start cambia-colore/index.html
```

### 3. Integrare una funzione nel tuo progetto
Copia il file JavaScript dalla cartella `js/` della funzione desiderata nel tuo progetto e includilo:
```html
<script src="path/to/colorChanger.js"></script>
```

### 🌐 Usare la libreria completa via CDN

Puoi importare tutte le funzioni direttamente via CDN usando il seguente comando:
```javascript
import * as utils from "https://cdn.jsdelivr.net/gh/MindrasEugen/funzioni-pronte-al-uso/index.js";
```

Il CDN utilizzato è **jsDelivr**, che distribuisce automaticamente il file `index.js` dal repository GitHub [MindrasEugen/funzioni-pronte-al-uso](https://github.com/MindrasEugen/funzioni-pronte-al-uso).

## 📋 Panoramica Funzioni

### 🎨 Manipolazione DOM e Stili

#### `cambiaColore(elemento)`
Cambia il colore di sfondo di qualsiasi elemento HTML con un colore RGB casuale.
- **Parametri**: `elemento` (HTMLElement)
- **Demo**: Colori che cambiano automaticamente ogni secondo
- **Uso tipico**: Effetti visivi dinamici, background animati

#### `crea(tag, classe, testo)`
Crea un nuovo elemento HTML con parametri opzionali.
- **Parametri**: `tag` (obbligatorio), `classe` (default: ""), `testo` (default: "")
- **Demo**: Creazione dinamica di elementi
- **Uso tipico**: Generazione dinamica di interfacce, liste, tabelle

#### `fadeIn(elemento, durata)`
Applica un effetto fade-in (dissolvenza in entrata) a un elemento.
- **Parametri**: `elemento` (HTMLElement), `durata` (default: 500ms)
- **Demo**: Elementi che appaiono con effetto a cascata
- **Uso tipico**: Animazioni di entrata, transizioni fluide

### 🔢 Utility Generali

#### `numeroCasuale(min, max)`
Genera un numero intero casuale compreso tra due valori (inclusi).
- **Parametri**: `min` (default: 0), `max` (default: 100)
- **Demo**: Numero che cambia ogni secondo
- **Uso tipico**: Simulazioni, giochi, selezione casuale da array

#### `logColor(msg, colore)`
Stampa un messaggio colorato nella console del browser.
- **Parametri**: `msg` (String), `colore` (default: "cyan")
- **Demo**: Messaggi colorati nella console
- **Uso tipico**: Debug più leggibile, logging professionale

### ⚡ Shortcut e Utility DOM

#### `$ (selettore)`
Shortcut per `document.querySelector()`.
- **Parametri**: `selettore` (String)
- **Demo**: Selezione elementi con sintassi abbreviata
- **Uso tipico**: Codice più conciso, prototipazione rapida
- **⚠️ Attenzione**: Può confliggere con jQuery

#### `on(elemento, evento, callback)`
Shortcut per `addEventListener()`.
- **Parametri**: `elemento` (HTMLElement), `evento` (String), `callback` (Function)
- **Demo**: Bottone interattivo che cambia colore
- **Uso tipico**: Gestione eventi più leggibile

### ⏱️ Performance e Controllo Flusso

#### `debounce(fn, delay)`
Ritarda l'esecuzione della funzione originale fino a quando non sono trascorsi `delay` millisecondi dall'ultima chiamata.
- **Parametri**: `fn` (Function), `delay` (default: 300ms)
- **Demo**: Input di testo con calcolo dinamico in tempo reale
- **Uso tipico**: Autocomplete, chiamate API su digitazione

#### `throttle(fn, limit)`
Assicura che una funzione non venga eseguita più di una volta ogni `limit` millisecondi.
- **Parametri**: `fn` (Function), `limit` (default: 300ms)
- **Demo**: Bottone per simulare eventi ad alta frequenza
- **Uso tipico**: Scroll listener, resize listener, prevenzione di click doppi

### 💾 Persistenza Dati

#### `salvaInArchivio(chiave, valore)` / `recuperaDaArchivio(chiave, valoreDefault)`
Salva e recupera in sicurezza oggetti e array nell'archivio locale gestendo le eccezioni del browser e le restrizioni di privacy.
- **Parametri**: `chiave` (String), `valore` (Any), `valoreDefault` (default: null)
- **Demo**: Form interattivo per la gestione del profilo utente
- **Uso tipico**: Salvataggio preferenze utente, carrello spesa temporaneo

### 📅 Gestione Date e Tempo

#### `formattaData(data, stile)` / `tempoRelativo(data)`
Formatta date in italiano ed elabora il tempo trascorso colloquiale ("3 minuti fa", "ieri", etc.).
- **Parametri**: `data` (Date|String|Number), `stile` ('breve', 'estesa', 'completa', 'ora')
- **Demo**: Selettore data-time con anteprime in tempo reale
- **Uso tipico**: Notifiche temporali, visualizzazione di timestamp colloquiali

## 💡 Combinare le Funzioni

Le funzioni sono progettate per lavorare insieme. Alcuni esempi:

### Esempio 1: Creazione e animazione
```javascript
// Usa crea() e fadeIn() insieme
const newDiv = crea("div", "notification", "Nuova notifica!");
document.body.appendChild(newDiv);
fadeIn(newDiv, 400);
```

### Esempio 2: Selezione e gestione eventi
```javascript
// Usa $() e on() insieme
on($("#myButton"), "click", () => {
    logColor("Bottone cliccato!", "green");
});
```

### Esempio 3: Generazione casuale
```javascript
// Usa numeroCasuale() e cambiaColore()
const elementi = document.querySelectorAll(".box");
elementi.forEach(el => {
    on(el, "mouseover", () => {
        cambiaColore(el);
    });
});
```

## 🎓 Struttura Standard

Ogni funzione segue la stessa struttura per garantire coerenza:

```
nomi-funzione/
├── js/
│   └── nomeFile.js          # Implementazione della funzione
│                           # - Commenti all'inizio (descrizione, uso)
│                           # - Codice della funzione
│                           # - Demo automatica o interattiva
│                           # - Commenti finali (dettagli implementativi)
│
├── css/
│   └── styles.css          # Stili per la demo
│                           # - Design pulito e responsivo
│                           # - Animazioni e transizioni
│
├── index.html              # Pagina demo
│                           # - Titolo descrittivo
│                           # - Descrizione della funzione
│                           # - Demo interattiva
│                           # - Istruzioni chiare
│
└── README.md               # Documentazione
                            # - Descrizione dettagliata
                            # - Parametri e valori di ritorno
                            # - Esempi di utilizzo
                            # - Dettagli tecnici
                            # - Casi d'uso avanzati
```

## 📝 Convenzioni

- **Nomi cartelle**: In italiano, con trattino (kebab-case)
- **Nomi file JS**: In inglese, camelCase
- **Commenti**: Solo all'inizio e alla fine dei file, non invasivi
- **Demo**: Automatiche o interattive, sempre chiare
- **Documentazione**: Completa ma concisa

## 🛠️ Requisiti

- Browser moderno che supporta:
  - ES6+ (per template literals, arrow functions, ecc.)
  - CSS Transitions (per animazioni)
  - `requestAnimationFrame` (per animazioni fluide)
- Nessuna dipendenza esterna

## 📜 Licenza

Questa raccolta è fornita come risorsa di apprendimento. Sentiti libero di:
- Usare le funzioni nei tuoi progetti
- Modificarle secondo le tue esigenze
- Condividerle con altri

## 🙏 Contribuire

Se hai suggerimenti per nuove funzioni o miglioramenti, puoi:
1. Aggiungere una nuova cartella con la stessa struttura
2. Seguire le convenzioni esistenti
3. Assicurarti che la demo funzioni correttamente

## 📞 Supporto

Per domande su una funzione specifica, consulta il relativo file `README.md` all'interno della cartella della funzione.

---

> **Nota**: Tutte le funzioni sono state testate e verificano in ambienti browser moderni.
> Per l'ottimale esperienza, usa Chrome, Firefox, Edge o Safari aggiornati.
