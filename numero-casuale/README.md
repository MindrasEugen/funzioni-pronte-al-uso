# Numero Casuale

Funzione JavaScript che genera un numero intero casuale compreso tra due valori estremi (inclusi).

## Struttura del progetto

```
numero-casuale/
├── js/
│   └── randomNumber.js     # Funzione principale
├── css/
│   └── styles.css          # Stili di base per la demo
├── index.html              # Pagina demo
└── README.md               # Questo file
```

## Funzione `numeroCasuale(min, max)`

### Descrizione
Genera un numero intero casuale all'interno di un intervallo specificato. Entrambi gli estremi (min e max) sono inclusivi, cioè possono essere restituiti come risultato.

### Parametri
- **min** (Number, default: 0): Il valore minimo dell'intervallo (incluso)
- **max** (Number, default: 100): Il valore massimo dell'intervallo (incluso)

### Valore di ritorno
- **Number**: Un intero casuale compreso tra min e max, inclusi entrambi gli estremi

### Dettagli tecnici

La funzione implementa l'algoritmo standard per generare numeri casuali in un intervallo:

1. **Math.random()**: Genera un numero floating-point tra 0 (inclusivo) e 1 (esclusivo)
2. **Scalatura dell'intervallo**: `Math.random() * (max - min + 1)` espande l'intervallo da [0,1) a [0, max-min+1)
3. **Troncamento**: `Math.floor()` converta il float in un intero, ottenendo valori da 0 a (max-min)
4. **Traslazione**: `+ min` sposta l'intervallo da [0, max-min] a [min, max]

### Esempi di utilizzo

```javascript
// Numero tra 1 e 10 (come un dado a 10 facce)
const dado = numeroCasuale(1, 10);

// Numero tra 0 e 99
const indice = numeroCasuale(0, 99);

// Utilizzando i valori predefiniti (0-100)
const casuale = numeroCasuale();

// Selezione casuale da un array
const colori = ['rosso', 'verde', 'blu', 'giallo'];
const coloreCasuale = colori[numeroCasuale(0, colori.length - 1)];

// Simulazione lancio di dado a 6 facce
const dado6 = numeroCasuale(1, 6);
```

### Caso d'uso comune: estrarre un elemento casuale da un array

```javascript
function elementoCasuale(array) {
    const indice = numeroCasuale(0, array.length - 1);
    return array[indice];
}

const frutti = ['mela', 'banana', 'arancia', 'pera'];
console.log(elementoCasuale(frutti)); // Es: "banana"
```

## Demo
Apri `index.html` in un browser per vedere l'effetto in azione. Il numero visualizzato nel titolo cambierà automaticamente ogni secondo, mostrando valori compresi tra 1 e 100.

## Personalizzazione
- Modifica i parametri in `randomNumber.js` per cambiare l'intervallo della demo
- Adatta `styles.css` per personalizzare l'aspetto della pagina
- Aggiungi ulteriori chiamate alla funzione in `index.html` per mostrare più esempi contemporaneamente

## Note
- La funzione è inclusiva di entrambi gli estremi: `numeroCasuale(1, 3)` può restituire 1, 2 o 3
- Se min > max, la funzione restituirà sempre min (comportamento non definito, è buona pratica validare gli input)
- Per generare numeri floating-point, usa direttamente `Math.random()` con opportune trasformazioni