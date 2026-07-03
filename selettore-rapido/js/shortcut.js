/**
 * Shortcut per document.querySelector().
 * 
 * Questa funzione fornisce un modo rapido e conciso per selezionare elementi DOM,
 * riducendo la verbosità del codice JavaScript. Particolarmente utile per:
 * - Sviluppo rapido di prototipi
 * - Codice più leggibile e compatto
 * - Progetti dove document.querySelector() viene usato frequentementi
 * - Librerie e framework personali
 * 
 * ATTENZIONE: Il nome `$` può entrare in conflitto con librerie come jQuery.
 * Usare con cautela in progetti che includono altre librerie che usano lo stesso simbolo.
 */

function $(selettore) {
    return document.querySelector(selettore);
}

// DEMO - Commentate per uso tramite CDN
// Demo: cambia il colore del titolo ogni secondo usando lo shortcut $
// setInterval(() => {
//     const titolo = $("h1");
//     titolo.style.color = `rgb(
//         ${Math.floor(Math.random() * 256)},
//         ${Math.floor(Math.random() * 256)},
//         ${Math.floor(Math.random() * 256)}
//     )`;
// }, 1000);


/**
 * Dettagli implementativi:
 * - La funzione è una semplice wrapper intorno a document.querySelector()
 * - Accetta qualsiasi selettore CSS valido (tag, class, id, attribute, ecc.)
 * - Restituisce il primo elemento che matcha il selettore, o null se non trovato
 * - Non gestisce errori: se il selettore è invalido, querySelector restituirà null
 * 
 * Esempi di selettori validi:
 *   $("h1")          -> primo tag h1
 *   $(".mia-classe") -> primo elemento con classe "mia-classe"
 *   $("# mio-id")    -> elemento con id "mio-id"
 *   $("div.container") -> primo div con classe "container"
 *   $("[data-role='button']") -> primo elemento con attributo data-role="button"
 */