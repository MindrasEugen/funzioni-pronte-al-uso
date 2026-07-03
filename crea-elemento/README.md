# Crea Elemento

Funzione JavaScript che semplifica la creazione dinamica di elementi HTML.

## Struttura del progetto

```
crea-elemento/
├── js/
│   └── createElement.js    # Funzione principale
├── css/
│   └── styles.css          # Stili di base per la demo
├── index.html              # Pagina demo
└── README.md               # Questo file
```

## Funzione `crea(tag, classe, testo)`

### Descrizione
Crea un nuovo elemento HTML con tag specificato, classe CSS opzionale e contenuto testuale opzionale. 
La funzione restituisce l'elemento creato, pronto per essere manipolato o aggiunto al DOM.

### Parametri
- **tag** (String, obbligatorio): Il nome del tag HTML da creare (es: "div", "p", "span", "a", ecc.)
- **classe** (String, default: ""): La classe o le classi CSS da applicare all'elemento. 
  Più classi possono essere separate da spazi
- **testo** (String, default: ""): Il contenuto testuale dell'elemento

### Valore di ritorno
- **HTMLElement**: L'elemento DOM appena creato, pronto per essere appeso al documento

### Dettagli tecnici

La funzione incapsula i passaggi comuni per creare un elemento:

1. **Creazione**: `document.createElement(tag)` istanzia un nuovo elemento DOM
2. **Classe**: Se specificata, `className` applica la classe CSS
3. **Testo**: Se specificato, `textContent` imposta il contenuto testuale
4. **Restituzione**: L'elemento viene restituito per permetterne l'uso immediato

### Vantaggi

1. **Codice più pulito**: Una riga invece di 3-4
2. **Parametri opzionali**: Flessibilità nell'uso
3. **Sicurezza**: `textContent` è sicuro contro attacchi XSS (a differenza di `innerHTML`)
4. **Leggibilità**: Il nome `crea` è immediato per sviluppatori italofoni
5. **Riutilizzabilità**: Funziona con qualsiasi tag HTML valido

### Esempi di utilizzo

```javascript
// Creare un div semplice
const divVuoto = crea("div");

// Creare un div con classe
const card = crea("div", "card");

// Creare un div con classe e testo
const box = crea("div", "box", "Ciao mondo!");

// Creare un paragrafo con classe e testo
const paragrafo = crea("p", "testo", "Questo è un paragrafo.");

// Creare un link
const link = crea("a", "btn", "Clicca qui");
link.href = "https://esempio.it";

// Creare un elemento con più classi
const elemento = crea("div", "classe1 classe2 classe3", "Testo");

// Aggiungere l'elemento al DOM
const container = crea("div", "container");
const title = crea("h1", "title", "Titolo");
container.appendChild(title);
document.body.appendChild(container);

// Creare una lista
const lista = crea("ul", "menu");
["Home", "Prodotti", "Contatti"].forEach(text => {
    const item = crea("li", "menu-item", text);
    lista.appendChild(item);
});
document.body.appendChild(lista);
```

### Caso d'uso pratico: Creare una card

```javascript
function creaCard(titolo, descrizione) {
    const card = crea("div", "card");
    
    const cardTitle = crea("h3", "card-title", titolo);
    const cardBody = crea("p", "card-body", descrizione);
    
    card.appendChild(cardTitle);
    card.appendChild(cardBody);
    
    return card;
}

// Utilizzo
const miaCard = creaCard("Titolo Card", "Descrizione della card");
document.body.appendChild(miaCard);
```

### Caso d'uso pratico: Generare una tabella

```javascript
function creaTabella(dati) {
    const table = crea("table", "data-table");
    const thead = crea("thead");
    const tbody = crea("tbody");
    
    // Intestazione
    const headerRow = crea("tr");
    dati.headers.forEach(header => {
        const th = crea("th", "", header);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // Corpo
    dati.rows.forEach(row => {
        const tr = crea("tr");
        row.forEach(cell => {
            const td = crea("td", "", cell);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    return table;
}
```

### Confronto con l'approccio nativo

**Senza la funzione:**
```javascript
const el = document.createElement("div");
el.className = "my-class";
el.textContent = "Hello";
document.body.appendChild(el);
```

**Con la funzione:**
```javascript
const el = crea("div", "my-class", "Hello");
document.body.appendChild(el);
```

## Demo
Apri `index.html` in un browser per vedere la funzione in azione. Ogni secondo viene creato un nuovo elemento 
con classe `.box` e aggiunto alla pagina, con un effetto di animazione.

## Personalizzazione
- Modifica `createElement.js` per aggiungere parametri opzionali (es: id, attributi, stile)
- Adatta `styles.css` per cambiare l'aspetto degli elementi creati
- Modifica `index.html` per mostrare diversi esempi di creazione

## Note
- La funzione usa `textContent` che è sicuro contro XSS. Se hai bisogno di inserire HTML, 
  usa `innerHTML` dopo la creazione:
  ```javascript
  const el = crea("div");
  el.innerHTML = "<strong>Testo</strong> in grassetto";
  ```
- Per aggiungere più attributi, estendi la funzione o aggiungili dopo la creazione:
  ```javascript
  const link = crea("a", "btn", "Clicca");
  link.href = "https://esempio.it";
  link.target = "_blank";
  ```
- Per creare elementi con namespace (SVG, ecc.), usa `document.createElementNS()` direttamente