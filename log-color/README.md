# Log Color

Funzione JavaScript che stampa messaggi colorati nella console del browser.

## Struttura del progetto

```
log-color/
├── js/
│   └── colorLogger.js     # Funzione principale
├── css/
│   └── styles.css         # Stili di base per la demo
├── index.html             # Pagina demo
└── README.md              # Questo file
```

## Funzione `logColor(msg, colore)`

### Descrizione
Stampa un messaggio nella console del browser con il colore specificato, utilizzando 
la formattazione CSS supportata da `console.log()`. Questa funzione rende il debug più 
leggibile e professionale, permettendo di distinguere visivamente diversi tipi di messaggi.

### Parametri
- **msg** (String): Il messaggio da stampare nella console
- **colore** (String, default: "cyan"): Il colore del messaggio. Può essere un nome di colore CSS, 
  codice esadecimale, RGB, RGBA, HSL o HSLA

### Valore di ritorno
- **Void**: La funzione non restituisce nulla, stampa solo nella console

### Dettagli tecnici

La funzione sfrutta la possibilità di `console.log()` di interpretare formattazione CSS:

```javascript
console.log(`%c${msg}`, `color: ${colore}; font-weight: bold;`);
```

- **`%c`**: Placeholder CSS che indica che il testo successivo deve essere formattato
- **Primo argomento**: Il messaggio da stampare (sostituisce `%c`)
- **Secondo argomento**: Stringa CSS con gli stili da applicare
- **Formato**: Puoi aggiungere altri stili CSS come `font-size`, `background`, `text-decoration`, ecc.

### Esempi di utilizzo

```javascript
// Messaggio con colore predefinito (cyan)
logColor("Applicazione avviata");

// Messaggio di errore
logColor("Errore: file non trovato", "red");

// Messaggio di warning
logColor("Attenzione: valore non valido", "orange");

// Messaggio di successo
logColor("Operazione completata", "green");

// Messaggio informativo
logColor("Info: caricamento in corso", "blue");

// Colori esadecimali
logColor("Messaggio esadecimale", "#ff5722");

// Colori RGB
logColor("Messaggio RGB", "rgb(255, 87, 34)");

// Colori RGBA (con trasparenza)
logColor("Messaggio RGBA", "rgba(255, 87, 34, 0.7)");

// Colori HSL
logColor("Messaggio HSL", "hsl(15, 100%, 50%)");

// Colori HSLA
logColor("Messaggio HSLA", "hsla(15, 100%, 50%, 0.7)");
```

### Stili CSS aggiuntivi

Puoi estendere la formattazione aggiungendo altri stili CSS:

```javascript
// Con sfondo
console.log("%cErrore critico", "color: white; background: red; padding: 5px;");

// Con dimensione font
logColor("Titolo", "darkblue");
console.log("%c=== SEZIONE ===", "color: #333; font-size: 18px; font-weight: bold;");

// Con bordi
console.log("%cAttenzione", "color: #d32f2f; border: 2px solid #d32f2f; padding: 2px 8px;");

// Multi-linea con stili diversi
console.log(
    "%cLinea 1\n%cLinea 2",
    "color: blue;",
    "color: red;"
);
```

Per incapsulare questo in una funzione più flessibile:

```javascript
function logStyled(msg, styles = "") {
    console.log(`%c${msg}`, styles);
}

logStyled("Messaggio con sfondo", "color: white; background: #4CAF50; padding: 3px 6px; border-radius: 3px;");
```

### Creare un sistema di logging completo

```javascript
const logger = {
    info: (msg) => logColor(`[INFO] ${msg}`, "blue"),
    warn: (msg) => logColor(`[WARN] ${msg}`, "orange"),
    error: (msg) => logColor(`[ERROR] ${msg}`, "red"),
    success: (msg) => logColor(`[SUCCESS] ${msg}`, "green"),
    debug: (msg) => logColor(`[DEBUG] ${msg}`, "purple"),
    trace: (msg) => logColor(`[TRACE] ${msg}`, "gray")
};

// Utilizzo
logger.info("Applicazione avviata");
logger.warn("Valore non valido rilevato");
logger.error("Impossibile connettersi al server");
logger.success("Dati salvati con successo");
```

### Tabella colori CSS standard

| Nome colore | Codice esadecimale | Descrizione |
|-------------|-------------------|-------------|
| `aqua` | `#00FFFF` | Ciano/Azzurro |
| `black` | `#000000` | Nero |
| `blue` | `#0000FF` | Blu |
| `fuchsia` | `#FF00FF` | Magenta/Fucsia |
| `green` | `#008000` | Verde |
| `lime` | `#00FF00` | Verde lime |
| `maroon` | `#800000` | Marrone scuro |
| `navy` | `#000080` | Blu marina |
| `olive` | `#808000` | Verde oliva |
| `purple` | `#800080` | Viola |
| `red` | `#FF0000` | Rosso |
| `silver` | `#C0C0C0` | Argento |
| `teal` | `#008080` | Verde acqua |
| `white` | `#FFFFFF` | Bianco |
| `yellow` | `#FFFF00` | Giallo |

### Colori per tipologia di messaggio (convenzioni comuni)

| Tipo | Colore suggerito | Esempio |
|------|------------------|---------|
| Informazione | `blue` | `logColor("Info...", "blue")` |
| Successo | `green` | `logColor("Success...", "green")` |
| Warning | `orange` / `yellow` | `logColor("Warning...", "orange")` |
| Errore | `red` | `logColor("Error...", "red")` |
| Debug | `purple` / `magenta` | `logColor("Debug...", "purple")` |
| Traccia | `gray` | `logColor("Trace...", "gray")` |

## Demo
Apri `index.html` in un browser e:
1. Apri la console del browser (<kbd>F12</kbd> o <kbd>Ctrl+Shift+I</kbd>)
2. Vedrai messaggi colorati stampati automaticamente al caricamento
3. Clicca il bottone "Testa altri colori" per vedere altri esempi

## Personalizzazione
- Modifica `colorLogger.js` per aggiungere altri stili o formattazioni
- Adatta `styles.css` per cambiare l'aspetto della pagina demo
- Aggiungi più esempi di colori in `index.html`

## Note
- I colori e gli stili applicati dipendono dal browser. Alcuni browser potrebbero 
  non supportare tutte le proprietà CSS
- La formattazione `%c` è supportata in tutti i browser moderni (Chrome, Firefox, Edge, Safari)
- In Node.js, questa funzione non funzionerà (console.log non supporta la formattazione CSS)
- Per disabilitare i log in produzione, puoi sovrascrivere la funzione:
  ```javascript
  function logColor() {} // Funzione vuota in produzione
  ```
  Oppure usare un flag:
  ```javascript
  const DEBUG = false;
  function logColor(msg, colore = "cyan") {
      if (DEBUG) {
          console.log(`%c${msg}`, `color: ${colore}; font-weight: bold;`);
      }
  }
  ```