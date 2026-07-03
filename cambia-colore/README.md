# Cambia Colore

Funzione JavaScript che cambia dinamicamente il colore di sfondo di qualsiasi elemento HTML in modo casuale.

## Struttura del progetto

```
cambia-colore/
├── js/
│   └── colorChanger.js    # Funzione principale
├── css/
│   └── styles.css         # Stili di base per la demo
├── index.html             # Pagina demo
└── README.md              # Questo file
```

## Funzione `cambiaColore(elemento)`

### Descrizione
La funzione genera un colore RGB casuale e lo applica come colore di sfondo all'elemento HTML specificato.

### Parametri
- **elemento** (HTMLElement): L'elemento DOM cui applicare il cambio di colore.

### Dettagli tecnici
- Utilizza `Math.random()` per generare valori casuali tra 0 e 1
- Moltiplica per 256 per coprire l'intervallo RGB (0-255)
- `Math.floor()` arrotonda all'intero inferiore per ottenere valori RGB validi
- Crea una stringa nel formato `rgb(R, G, B)` compatibile con CSS

### Utilizzo
```javascript
// Applica a un elemento specifico
cambiaColore(document.getElementById("myElement"));

// Applica ogni secondo al body
setInterval(() => {
    cambiaColore(document.body);
}, 1000);
```

## Demo
Apri `index.html` in un browser per vedere l'effetto in azione. Il colore di sfondo del body e del titolo `<h1>` cambieranno automaticamente ogni secondo.

## Personalizzazione
- Modifica `styles.css` per adattare l'aspetto della pagina demo
- Aggiungi altri elementi da colorare modificando `colorChanger.js`