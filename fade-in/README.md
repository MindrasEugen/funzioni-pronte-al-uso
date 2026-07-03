# Fade In

Funzione JavaScript che applica un effetto di dissolvenza in entrata (fade-in) a un elemento DOM.

## Struttura del progetto

```
fade-in/
├── js/
│   └── animations.js      # Funzione principale
├── css/
│   └── styles.css         # Stili di base per la demo
├── index.html             # Pagina demo
└── README.md              # Questo file
```

## Funzione `fadeIn(elemento, durata)`

### Descrizione
Applica un effetto fade-in (dissolvenza in entrata) a un elemento DOM, facendolo passare 
da invisibile (trasparente) a completamente visibile in modo fluido. Questo crea un effetto 
professionale e gradevole per l'utente finale.

### Parametri
- **elemento** (HTMLElement): L'elemento DOM a cui applicare l'effetto fade-in
- **durata** (Number, default: 500): La durata dell'animazione in millisecondi

### Valore di ritorno
- **Void**: La funzione non restituisce nulla, modifica direttamente lo stile dell'elemento

### Dettagli tecnici

La funzione implementa l'animazione usando CSS transitions:

```javascript
function fadeIn(el, durata = 500) {
    el.style.opacity = 0;                      // Rende l'elemento invisibile
    el.style.transition = `opacity ${durata}ms ease`;  // Configura la transizione
    requestAnimationFrame(() => el.style.opacity = 1); // Attiva l'animazione
}
```

- **`opacity: 0`**: Imposta l'elemento come completamente trasparente
- **`transition`**: Definisce la proprietà CSS da animare (`opacity`), la durata e la timing function (`ease`)
- **`requestAnimationFrame`**: Garantisce che il cambiamento a `opacity: 1` avvenga nel prossimo frame, 
  permettendo al browser di applicare correttamente l'animazione di transizione

### Timing Functions

La funzione usa `ease` come predefinita, ma puoi modificare lo stile CSS direttamente per altri effetti:

| Timing Function | Descrizione | Effetto |
|-----------------|-------------|---------|
| `ease` | Predefinita | Inizia lento, accelera, finisce lento |
| `linear` | Lineare | Velocità costante |
| `ease-in` | Entrata lento | Inizia lento, poi costante |
| `ease-out` | Uscita lento | Inizia veloce, finisce lento |
| `ease-in-out` | Entrata/uscita lento | Inizia e finisce lento |
| `cubic-bezier(n,n,n,n)` | Personalizzata | Controllo completo |

Esempio con timing function personalizzata:
```javascript
function fadeIn(el, durata = 500, timing = "ease") {
    el.style.opacity = 0;
    el.style.transition = `opacity ${durata}ms ${timing}`;
    requestAnimationFrame(() => el.style.opacity = 1);
}

fadeIn(myElement, 1000, "cubic-bezier(0.68, -0.55, 0.27, 1.55)");
```

### Esempi di utilizzo

```javascript
// Fade-in con durata predefinita (500ms)
const elemento = document.getElementById("myElement");
fadeIn(elemento);

// Fade-in con durata personalizzata
fadeIn(elemento, 1000); // 1 secondo

// Fade-in su più elementi
const elements = document.querySelectorAll(".item");
elements.forEach(el => fadeIn(el, 800));

// Fade-in a cascata (effetto sequenziale)
const items = document.querySelectorAll(".menu-item");
items.forEach((item, index) => {
    setTimeout(() => {
        fadeIn(item, 500 + index * 100);
    }, index * 100);
});

// Uso con la funzione $() (se definita)
fadeIn($("#modal"), 300);

// Uso con la funzione crea() (se definita)
const newDiv = crea("div", "notification", "Nuova notifica");
document.body.appendChild(newDiv);
fadeIn(newDiv, 400);
```

### Fade-in con delay

Per aggiungere un ritardo prima che l'animazione inizi:

```javascript
function fadeInWithDelay(el, durata = 500, delay = 0) {
    el.style.opacity = 0;
    el.style.transition = `opacity ${durata}ms ease ${delay}ms`;
    requestAnimationFrame(() => el.style.opacity = 1);
}

fadeInWithDelay(myElement, 500, 1000); // Inizia dopo 1 secondo
```

### Fade-in da diverse direzioni

Combinando con transforms per effetti più avanzati:

```javascript
function fadeInFrom(el, durata = 500, direction = "top") {
    el.style.opacity = 0;
    
    switch(direction) {
        case "top":
            el.style.transform = "translateY(-20px)";
            break;
        case "bottom":
            el.style.transform = "translateY(20px)";
            break;
        case "left":
            el.style.transform = "translateX(-20px)";
            break;
        case "right":
            el.style.transform = "translateX(20px)";
            break;
    }
    
    el.style.transition = `opacity ${durata}ms ease, transform ${durata}ms ease`;
    requestAnimationFrame(() => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
    });
}

fadeInFrom(myElement, 600, "top");
```

### Fade-in con callback

Per eseguire codice al completamento dell'animazione:

```javascript
function fadeIn(el, durata = 500, callback) {
    el.style.opacity = 0;
    el.style.transition = `opacity ${durata}ms ease`;
    
    requestAnimationFrame(() => {
        el.style.opacity = 1;
    });
    
    // Aggiungi listener per il completamento
    const onTransitionEnd = () => {
        el.removeEventListener('transitionend', onTransitionEnd);
        if (callback) callback();
    };
    el.addEventListener('transitionend', onTransitionEnd);
}

fadeIn(myElement, 500, () => {
    console.log("Animazione completata!");
});
```

### Animazione inversa: Fade-out

Per completare la coppia, ecco una funzione fadeOut:

```javascript
function fadeOut(el, durata = 500, callback) {
    el.style.opacity = 1;
    el.style.transition = `opacity ${durata}ms ease`;
    
    requestAnimationFrame(() => {
        el.style.opacity = 0;
    });
    
    if (callback) {
        const onTransitionEnd = () => {
            el.removeEventListener('transitionend', onTransitionEnd);
            callback();
        };
        el.addEventListener('transitionend', onTransitionEnd);
    }
}

// Esempio di toggle
function toggleFade(el, durata = 500) {
    const isVisible = parseFloat(el.style.opacity) > 0;
    if (isVisible) {
        fadeOut(el, durata);
    } else {
        fadeIn(el, durata);
    }
}
```

## Demo
Apri `index.html` in un browser. Vedrai 5 elementi che appaiono con effetto fade-in a cascata 
al caricamento della pagina. Clicca il bottone "Resetta e ripeti animazione" per vedere 
l'animazione da capo.

## Personalizzazione
- Modifica `animations.js` per cambiare la durata o aggiungere altri effetti
- Adatta `styles.css` per cambiare colore, dimensione o disposizione degli elementi
- Aggiungi più elementi in `index.html` per testare l'animazione su diversi tipi di contenuto

## Note
- Assicurati che l'elemento non abbia già `opacity` impostato a un valore diverso da 0 o 1
- La funzione sovrascrive eventuali proprietà `transition` già presenti sull'elemento
- Per animazioni più complesse, considera l'uso di `@keyframes` in CSS o librerie come 
  GSAP o anime.js
- La funzione usa `requestAnimationFrame` per garantire che l'animazione parta correttamente.
  Senza di esso, se l'elemento ha già opacity: 0, la transizione non sarebbe visibile
- Per browser molto vecchi (IE9 e precedenti), questa funzione non funzionerà. 
  Considera polyfill o fallbacks per questi casi