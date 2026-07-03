/**
 * Cambia il colore di sfondo di un elemento HTML in modo casuale.
 * Genera un colore RGB randomico e lo applica all'elemento specificato.
 * Utilizzato per creare effetti visivi dinamici su pagine web.
 */

export function cambiaColore(elemento) {
    const colore = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
    )`;

    elemento.style.backgroundColor = colore; // per cambiare il background
    //elemento.style.color = colore;  -- per cambiare il colore del testo
    // e sconsigliato usarle insieme nella stessa funzione perchè il risultato sarebbe un testo invisibile
}

// DEMO - Commentate per uso tramite CDN
// Applica l'effetto al body e al titolo principale ogni secondo
// setInterval(() => {
//     cambiaColore(document.body);
// }, 1000);
//
// setInterval(() => {
//     cambiaColore(document.querySelector("h1"));
// }, 1000);


/**
 * Note di implementazione:
 * - Math.random() genera un numero tra 0 (inclusivo) e 1 (esclusivo)
 * - Moltiplicando per 256 otteniamo valori tra 0 e 255.999...
 * - Math.floor() arrotonda all'intero inferiore, ottenendo valori RGB validi (0-255)
 * - La stringa template `rgb(...)` crea un colore RGB valido per CSS
 */



//------------------------------VARIANTE 2-------------------------//


// la seguente variante ci permete di operare più facilmente sia sul testo che sul background
// si tratta semplicemente di una combinazione di tre funzioni diverse
// che hanno come ruolo di semplificare la scrittura del codice se si intende di cambiare 
// in modo ripetitivo il colore del sfondo e del testo nella nostra pagina.
// una volta inserita la combinazione delle tre funzioni nel nostro codice ci bastera richiamara la funzione che fa a caso nostro:
// 1. cambiaSfondo: cambia il colore dello sfondo con colori casuali
// 2. cambiaTesto: cambia il colore del testo con colori casuali
// basta richiamare la funzione sul elemento desiderato : funzione(document.elemento)

export function coloreCasuale() {
    return `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
    )`;
}

export function cambiaSfondo(elemento) {
    elemento.style.backgroundColor = coloreCasuale();
}

export function cambiaTesto(elemento) {
    elemento.style.color = coloreCasuale();
}


// DEMO - Commentate per uso tramite CDN
// cambiaSfondo(document.body);
// cambiaTesto(document.body);
