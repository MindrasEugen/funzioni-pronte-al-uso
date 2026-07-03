# Selettore Rapido $

Funzione JavaScript che fornisce uno shortcut conciso per `document.querySelector()`.

## Struttura del progetto

```
selettore-rapido/
├── js/
│   └── shortcut.js        # Funzione principale
├── css/
│   └── styles.css         # Stili di base per la demo
├── index.html             # Pagina demo
└── README.md              # Questo file
```

## Funzione `$ (selettore)`

### Descrizione
Questa funzione è una wrapper semplificata intorno al metodo nativo `document.querySelector()`. 
Permette di selezionare elementi DOM usando una sintassi più breve e leggibile.

### Parametri
- **selettore** (String): Una stringa che contiene uno o più selettori CSS separati da virgole. 
  Gli spazi non sono ammesi all'interno di un selettore.

### Valore di ritorno
- **HTMLElement | null**: Il primo elemento del documento che matcha il selettore specificato, 
  o `null` se nessun elemento corrisponde.

### Dettagli tecnici

La funzione è una semplice delegazione a `document.querySelector()`:

```javascript
function $(selettore) {
    return document.querySelector(selettore);
}
```

- **Prestazioni**: Non c'è overhead significativo, la funzione chiama direttamente il metodo nativo
- **Compatibilità**: Funziona in tutti i browser che supportano `querySelector` (IE8+)
- **Limitazioni**: Restituisce solo il **primo** elemento che matcha il selettore

### Esempi di utilizzo

```javascript
// Selezionare per tag
const titolo = $("h1");
const paragrafi = $("p"); // Restituisce solo il primo <p>

// Selezionare per classe
const elemento = $(".mia-classe");

// Selezionare per ID
const box = $("#my-box");

// Selezionare per attributo
const button = $("[type='submit']");

// Selezionare con selettori complessi
const primoLink = $("nav ul li:first-child a");

// Uso pratico
$("#my-button").addEventListener('click', () => {
    $("#result").textContent = "Button clicked!";
});
```

### Selettori CSS supportati

La funzione supporta tutti i selettori CSS validi:

| Tipo | Esempio | Descrizione |
|------|---------|-------------|
| Tag | `"div"` | Seleziona tutti i div (restituisce il primo) |
| Classe | `".mia-classe"` | Seleziona elementi con classe specificata |
| ID | `"#mio-id"` | Seleziona elemento con ID specificato |
| Attributo | `[type="text"]` | Seleziona per attributo |
| Discendente | `"div p"` | Seleziona <p> all'interno di <div> |
| Figlio | `"ul > li"` | Seleziona <li> diretto figlio di <ul> |
| Pseudo-classe | `":first-child"` | Seleziona il primo figlio |
| Pseudo-elemento | `"::before"` | Seleziona pseudo-elementi |

### Vantaggi

1. **Codice più breve**: `$("h1")` vs `document.querySelector("h1")`
2. **Maggiore leggibilità**: Soprattutto in progetti con molte selezioni
3. **Coerenza**: Usa lo stesso pattern di librerie popolari come jQuery
4. **Facile da ricordare**: Il simbolo `$` è ampiamente riconoscibile

### Svantaggi e avvertenze

1. **Conflitti con altre librerie**: jQuery, Prototype.js e altre usano `$`
2. **Solo il primo elemento**: Ricordati che restituisce solo il primo match
3. **Nessun error handling**: Restituisce `null` per selettori invalidi
4. **Non standard**: Non è parte dello standard JavaScript

### Soluzioni ai conflitti

Se usi anche jQuery o altre librerie che usano `$`:

```javascript
// Opzione 1: Usare un nome diverso
function q(selettore) {
    return document.querySelector(selettore);
}

// Opzione 2: Usare IIFE per isolare lo scope
(function() {
    function $(selettore) {
        return document.querySelector(selettore);
    }
    // Il tuo codice qui
})();

// Opzione 3: Salvare il riferimento originale e restaurarlo
const jQueryOriginal = $;
function $(selettore) {
    return document.querySelector(selettore);
}
// ... il tuo codice ...
// Poi restaurare: $ = jQueryOriginal;
```

## Demo
Apri `index.html` in un browser per vedere lo shortcut in azione. Il colore del titolo cambia ogni secondo, 
selezionato e modificato usando `$("h1")` invece di `document.querySelector("h1")`.

## Personalizzazione
- Modifica `shortcut.js` per usare un nome diverso se preferisci evitare `$`
- Adatta `styles.css` per cambiare l'aspetto della pagina demo
- Aggiungi più esempi in `index.html` per dimostrare diversi selettori

## Note
- Per selezionare **tutti** gli elementi che matchano un selettore, usa `document.querySelectorAll()`
  e crea uno shortcut separato se necessario
- Considera di aggiungere validazione del selettore per debugging:
  ```javascript
  function $(selettore) {
      const result = document.querySelector(selettore);
      if (!result) console.warn(`Nessun elemento trovato per il selettore: ${selettore}`);
      return result;
  }
  ```