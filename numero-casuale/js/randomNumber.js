/**
 * Genera un numero intero casuale compreso tra due valori (inclusi).
 * 
 * Questa funzione è utile per:
 * - Simulare dati casuali (dadi, estrazioni, ecc.)
 * - Creare comportamento imprevedibile in giochi e animazioni
 * - Selezione casuale di elementi da un array
 * - Generazione di ID temporanei o token
 * - Test e debug con valori variabili
 */

export function numeroCasuale(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// DEMO - Commentate per uso tramite CDN
// Demo: aggiorna il titolo con un numero casuale tra 1 e 100 ogni secondo
// setInterval(() => {
//     document.querySelector("h1").textContent = numeroCasuale(1, 100);
// }, 1000);

/**
 * Dettagli implementativi:
 * - Math.random() restituisce un float tra 0 (inclusivo) e 1 (esclusivo)
 * - (max - min + 1) calcola l'intervallo incluso: se min=1, max=10 → 10 numeri possibili
 * - Math.floor() tranca il decimale, ottenendo un intero tra 0 e (max-min)
 * - + min sposta l'intervallo da [0, max-min] a [min, max]
 * 
 * Esempio con min=5, max=8:
 *   Math.random() * 4 → [0, 3.999...]
 *   Math.floor() → [0, 1, 2, 3]
 *   + 5 → [5, 6, 7, 8]
 */