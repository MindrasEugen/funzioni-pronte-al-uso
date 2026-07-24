# Debounce & Throttle

> Funzioni di controllo del flusso per limitare la frequenza di esecuzione di altre funzioni, migliorando notevolmente le performance delle applicazioni web.

---

## 📖 Descrizione

Nel front-end moderno, eventi come la digitazione, il ridimensionamento della finestra, lo scroll o il mouse-moving avvengono ad altissima frequenza. Eseguire costantemente calcoli pesanti o richieste HTTP per ogni singolo evento può rallentare l'applicazione.

- **Debounce**: Raggruppa una serie di chiamate ravvicinate ed esegue la funzione solo **dopo** che è trascorso un certo intervallo di silenzio (es. ideale per un input di ricerca search-as-you-type).
- **Throttle**: Garantisce che la funzione venga eseguita al massimo **una volta** ogni intervallo stabilito (es. ideale per aggiornare la UI durante lo scroll di una pagina).

---

## 🛠️ Parametri e Ritorno

### `debounce(fn, delay)`
- **`fn`** *(Function)*: La funzione originale che si desidera rallentare.
- **`delay`** *(Number)*: Il tempo di attesa in millisecondi (default: `300`).
- **Ritorna**: *(Function)* La versione "debounced" della funzione originale.

### `throttle(fn, limit)`
- **`fn`** *(Function)*: La funzione originale da limitare.
- **`limit`** *(Number)*: L'intervallo minimo tra le esecuzioni in millisecondi (default: `300`).
- **Ritorna**: *(Function)* La versione "throttled" della funzione originale.

---

## 💻 Esempi di Utilizzo

### JavaScript Vanilla

```javascript
import { debounce, throttle } from "./js/debounceThrottle.js";

// 1. Debounce su input di ricerca
const cercaInAPI = (chiave) => {
    console.log("Ricerca per:", chiave);
};

const inputCerca = document.getElementById("search");
const cercaConDebounce = debounce((e) => cercaInAPI(e.target.value), 400);

inputCerca.addEventListener("input", cercaConDebounce);


// 2. Throttle su resize della finestra
const gestisciResize = () => {
    console.log("Nuova larghezza:", window.innerWidth);
};

const resizeThrottled = throttle(gestisciResize, 500);
window.addEventListener("resize", resizeThrottled);
```

### React

In React, le funzioni vengono ri-create ad ogni render. Per evitare che la closure interna di debounce o throttle venga azzerata (perdendo lo stato del timer), è necessario usare `useMemo` o `useCallback`.

```jsx
import React, { useState, useMemo, useEffect } from 'react';
import { debounce } from './js/debounceThrottle';

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Memorizziamo la funzione debounced per evitare che venga ricreata ad ogni render
  const debouncedSearch = useMemo(
    () => debounce((searchQuery) => {
      // Effettua la chiamata API
      fetch(`/api/search?q=${searchQuery}`)
        .then(res => res.json())
        .then(data => setResults(data));
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value); // Chiamata debounced
  };

  // Pulizia per evitare leak in caso di smontaggio del componente
  useEffect(() => {
    return () => {
      // Se il debounce avesse un metodo di cancel(), andrebbe chiamato qui.
    };
  }, [debouncedSearch]);

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Cerca..." />
      <ul>
        {results.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

---

## 🔬 Dettagli Tecnici

### Come funziona il Debounce?
Ogni volta che la funzione debounced viene invocata, cancella il timer precedente (`clearTimeout(timeoutId)`) e ne avvia uno nuovo. L'esecuzione avverrà solo se il timer riesce a scadere senza che siano avvenute altre chiamate nel frattempo.

### Come funziona il Throttle?
Utilizza una variabile booleana (`inThrottle`) che funge da semaforo. Al primo click la chiamata passa immediatamente, e il semaforo diventa rosso. Fino a quando il timer non ripristina il semaforo a verde, tutti i click successivi vengono ignorati.
