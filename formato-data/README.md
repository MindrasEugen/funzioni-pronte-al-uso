# Formato Data & Tempo Relativo

> Utility JavaScript per la formattazione localizzata in italiano delle date (tramite Intl) e per il calcolo colloquiale del tempo trascorso o futuro (relative time).

---

## 📖 Descrizione

La visualizzazione delle date nelle interfacce moderne richiede spesso flessibilità: da formati standard brevi a stringhe descrittive (es. "venerdì 24 luglio 2026") o espressioni relative per flussi dinamici come post, commenti o log di sistema (es. "3 ore fa", "tra 5 minuti").

Questa utility risponde a queste esigenze senza caricare librerie pesanti di terze parti (come Moment.js o Date-fns), sfruttando l'API nativa `Intl.DateTimeFormat` e calcolando matematicamente le differenze temporali in italiano.

---

## 🛠️ Funzioni Esportate

### `formattaData(dataInput, stile)`
Formatta una data in italiano secondo vari stili pronti all'uso.
- **`dataInput`** *(Date|String|Number)*: L'oggetto Date, la stringa in formato data o il timestamp da formattare.
- **`stile`** *(String)*: Uno stile tra:
  - `'breve'` (default): `24/07/2026`
  - `'estesa'`: `24 luglio 2026`
  - `'completa'`: `venerdì 24 luglio 2026`
  - `'ora'`: `12:30`
- **Ritorna**: *(String)* La data formattata in lingua italiana.

### `tempoRelativo(dataInput)`
Calcola la differenza con l'ora corrente e restituisce una descrizione testuale amichevole del tempo trascorso o futuro.
- **`dataInput`** *(Date|String|Number)*: La data di riferimento passata o futura.
- **Ritorna**: *(String)* Il testo descrittivo relativo (es. "giusto ora", "ieri", "10 minuti fa", "tra 3 giorni").

---

## 💻 Esempi di Utilizzo

### JavaScript Vanilla

```javascript
import { formattaData, tempoRelativo } from "./js/formatDate.js";

const dataEsempio = new Date("2026-07-24T12:30:00");

// Esempi di formattazione
console.log(formattaData(dataEsempio, 'breve'));    // "24/07/2026"
console.log(formattaData(dataEsempio, 'estesa'));   // "24 luglio 2026"
console.log(formattaData(dataEsempio, 'completa')); // "venerdì 24 luglio 2026"
console.log(formattaData(dataEsempio, 'ora'));      // "12:30"

// Esempi di tempo relativo
console.log(tempoRelativo(Date.now() - 5000));      // "giusto ora"
console.log(tempoRelativo(Date.now() - 120000));    // "2 minuti fa"
console.log(tempoRelativo(Date.now() - 3600000));   // "un'ora fa" (o "1 ore fa")
console.log(tempoRelativo(Date.now() - 86400000));  // "ieri"
console.log(tempoRelativo(Date.now() + 172800000)); // "tra 2 giorni"
```

### React (Componente `<TempoRelativo />`)

In React, per garantire che un indicatore come "5 minuti fa" si aggiorni dinamicamente sul browser a intervalli regolari senza costringere l'utente a ricaricare la pagina:

```jsx
import React, { useState, useEffect } from 'react';
import { tempoRelativo } from './js/formatDate';

export function TempoRelativo({ data, intervalloAggiornamento = 30000 }) {
  const [testoRelativo, setTestoRelativo] = useState(() => tempoRelativo(data));

  useEffect(() => {
    // Aggiornamento immediato al cambio di prop 'data'
    setTestoRelativo(tempoRelativo(data));

    // Imposta un timer per ricalcolare il tempo relativo
    const timer = setInterval(() => {
      setTestoRelativo(tempoRelativo(data));
    }, intervalloAggiornamento);

    // Pulisce l'intervallo allo smontaggio del componente
    return () => clearInterval(timer);
  }, [data, intervalloAggiornamento]);

  return (
    <span className="relative-time-badge" title={new Date(data).toLocaleString('it-IT')}>
      {testoRelativo}
    </span>
  );
}

// === Utilizzo ===
// <TempoRelativo data="2026-07-24T12:00:00" />
```

---

## 🔬 Dettagli Tecnici

- **Zero Dipendenze**: Sfrutta le API native `Intl` per la formattazione localizzata, mantenendo il pacchetto ultra leggero e performante.
- **Robustezza**: Accetta diversi formati di input grazie al parsing pre-validato. Se l'input non è convertibile in una data valida, fallisce silenziosamente restituendo una stringa vuota invece di rompere l'applicazione.
