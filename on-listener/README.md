# On Listener

Funzione JavaScript che fornisce uno shortcut conciso per `addEventListener()`.

## Struttura del progetto

```
on-listener/
├── js/
│   └── eventListener.js    # Funzione principale
├── css/
│   └── styles.css          # Stili di base per la demo
├── index.html              # Pagina demo
└── README.md               # Questo file
```

## Funzione `on(elemento, evento, callback)`

### Descrizione
Aggiunge un event listener a un elemento DOM usando una sintassi più breve e leggibile. 
Questa funzione è una wrapper diretta intorno al metodo nativo `addEventListener()`.

### Parametri
- **elemento** (HTMLElement): L'elemento DOM a cui aggiungere il listener
- **evento** (String): Il nome dell'evento da ascoltare (senza prefisso "on")
- **callback** (Function): La funzione da eseguire quando l'evento si verifica

### Valore di ritorno
- **Void**: La funzione non restituisce nulla

### Dettagli tecnici

La funzione incapsula il metodo nativo:

```javascript
function on(elemento, evento, callback) {
    elemento.addEventListener(evento, callback);
}
```

- **Nessun overhead**: La funzione chiama direttamente il metodo nativo senza aggiungere logica aggiuntiva
- **Contesto preservato**: Il valore di `this` all'interno del callback sarà l'elemento, come con addEventListener
- **Event object**: Il callback riceve l'oggetto event standard con tutte le sue proprietà
- **Compatibilità**: Funziona in tutti i browser che supportano addEventListener (IE9+)

### Vantaggi

1. **Codice più breve**: `on(el, "click", fn)` vs `el.addEventListener("click", fn)`
2. **Maggiore leggibilità**: Soprattutto in progetti con molti listener
3. **Coerenza**: Usa lo stesso pattern di librerie come jQuery (`$(el).on()`)
4. **Facile da ricordare**: Il nome "on" è intuitivo per l'aggiunta di listener
5. **Meno errori**: Riduce la possibilità di errori di battitura su "addEventListener"

### Esempi di utilizzo

```javascript
// Click su un bottone
const button = document.getElementById("my-btn");
on(button, "click", () => {
    console.log("Bottone cliccato!");
});

// Mouse over su un div
const box = document.querySelector(".box");
on(box, "mouseover", () => {
    box.style.backgroundColor = "#f0f0f0";
});

// Keypress su un input
const input = document.getElementById("search");
on(input, "keypress", (e) => {
    if (e.key === "Enter") {
        performSearch();
    }
});

// Submit di un form
const form = document.getElementById("my-form");
on(form, "submit", (e) => {
    e.preventDefault();
    processForm();
});

// Cambiamento valore di un input
const checkbox = document.getElementById("agree");
on(checkbox, "change", (e) => {
    console.log("Checkbox stato:", e.target.checked);
});

// Focus su un campo
const nameInput = document.getElementById("name");
on(nameInput, "focus", () => {
    nameInput.style.borderColor = "#4CAF50";
});

// Uso con la funzione $() (se definita)
on($("#btn"), "click", () => alert("Cliccato!"));
```

### Confronto con l'approccio nativo

**Senza la funzione:**
```javascript
document.getElementById("btn").addEventListener("click", function() {
    console.log("Clicked!");
});
```

**Con la funzione:**
```javascript
on(document.getElementById("btn"), "click", () => {
    console.log("Clicked!");
});
```

Oppure con lo shortcut `$`:
```javascript
on($("#btn"), "click", () => console.log("Clicked!"));
```

### Eventi DOM comuni

| Evento | Descrizione |
|--------|-------------|
| `click` | Click del mouse |
| `dblclick` | Doppio click |
| `mousedown` / `mouseup` | Tasto del mouse premuto/rilasciato |
| `mouseenter` / `mouseleave` | Mouse entra/esce dall'elemento |
| `mousemove` | Mouse si muove sull'elemento |
| `keydown` / `keyup` | Tasto della tastiera premuto/rilasciato |
| `keypress` | Tasto premuto (deprecated in favore di keydown/keyup) |
| `focus` / `blur` | Elemento riceve/perde focus |
| `change` | Valore di input/select/textarea cambiato |
| `input` | Contenuto di input/testarea modificato |
| `submit` | Form inviato |
| `load` | Risorsa (img, script, window) caricata |
| `unload` | Pagina in corso di scaricamento |
| `resize` | Dimensione della finestra cambiata |
| `scroll` | Elemento scrollato |

### Gestione avanzata: Rimuovere un listener

Poiché `on()` è solo una wrapper, per rimuovere un listener devi usare il metodo nativo:

```javascript
function handleClick() {
    console.log("Clicked!");
}

const btn = document.getElementById("btn");

// Aggiungi listener
on(btn, "click", handleClick);

// Rimuovi listener (devi usare addEventListener direttamente per rimuovere)
btn.addEventListener("click", handleClick);
// Poi più tardi...
btn.removeEventListener("click", handleClick);
```

**Soluzione alternativa:** Crea una funzione più completa che tenga traccia dei listener:

```javascript
const listeners = new Map();

function on(elemento, evento, callback) {
    elemento.addEventListener(evento, callback);
    
    // Salva il listener per possibile rimozione
    const key = `${evento}-${Math.random().toString(36).substr(2, 9)}`;
    listeners.set(key, { elemento, evento, callback });
    
    return key; // Restituisci il key per rimuovere dopo
}

function off(key) {
    const listener = listeners.get(key);
    if (listener) {
        const { elemento, evento, callback } = listener;
        elemento.removeEventListener(evento, callback);
        listeners.delete(key);
    }
}

// Uso
const clickKey = on(btn, "click", handleClick);
// Più tardi...
off(clickKey);
```

### Event delegation

Per gestire eventi su elementi dinamici o multipli elementi, usa l'event delegation:

```javascript
// Invece di aggiungere listener a ogni bottone
const container = document.getElementById("buttons-container");

on(container, "click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        // Gestisci click su bottone delete
        const id = e.target.dataset.id;
        deleteItem(id);
    }
});
```

## Demo
Apri `index.html` in un browser. Cliccando il bottone "Cliccami!" vedrai cambiare il colore del riquadro 
sottostante e il suo contenuto mostrerà il valore RGB del nuovo colore.

## Personalizzazione
- Modifica `eventListener.js` per aggiungere altri eventi o logica
- Adatta `styles.css` per cambiare l'aspetto del bottone e del target
- Aggiungi più elementi e listener in `index.html` per dimostrare diversi casi d'uso

## Note
- La funzione non supporta automaticamente `once`, `capture`, o `passive` options di addEventListener.
  Per questi casi, usa il metodo nativo direttamente:
  ```javascript
  elemento.addEventListener("click", callback, { once: true });
  ```
- Per événementi personalizzati (Custom Events), usa il metodo nativo:
  ```javascript
  elemento.addEventListener("myEvent", callback);
  ```
- Il nome "on" potrebbe confliggere con proprietà di alcuni framework. In tal caso, rinomiala:
  ```javascript
  function listen(elemento, evento, callback) {
      elemento.addEventListener(evento, callback);
  }
  ```