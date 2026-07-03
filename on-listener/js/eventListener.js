/**
 * Aggiunge un event listener a un elemento DOM in modo compatto.
 * 
 * Questa funzione fornisce uno shortcut per addEventListener(), 
 * rendendo il codice più leggibile e riducendo la verbosità. 
 * Particolarmente utile per:
 * - Gestione degli eventi in modo conciso
 * - Codice più pulito in progetti con molti listener
 * - Sviluppo rapido di prototipi
 * - Creazione di librerie e framework personali
 * - Mantenere coerenza nello stile di codifica
 */

function on(elemento, evento, callback) {
    elemento.addEventListener(evento, callback);
}

// DEMO - Commentate per uso tramite CDN
// Demo: cambia il colore del target quando si clicca il bottone
// const btn = document.getElementById("btn");
// const target = document.getElementById("target");
//
// on(btn, "click", () => {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
//     target.textContent = `Colore: rgb(${r}, ${g}, ${b})`;
// });

/**
 * Dettagli implementativi:
 * - La funzione è una wrapper diretta intorno a addEventListener()
 * - Non modifica il comportamento nativo: il callback riceve lo stesso event object
 * - Mantiene il contesto (this) dell'elemento, come il metodo nativo
 * - Non aggiunge gestione automatica di removeEventListener
 * 
 * Note:
 * - Il nome "on" è breve e intuitivo per l'aggiunta di listener
 * - L'ordine dei parametri segue la convenzione: elemento, evento, callback
 * - Funziona con qualsiasi evento DOM standard (click, mouseover, keypress, ecc.)
 * - Per rimuovere un listener, usa il metodo nativo: elemento.removeEventListener()
 * 
 * Eventi comuni:
 *   "click" - Click del mouse
 *   "mouseover" / "mouseout" - Mouse entra/esce dall'elemento
 *   "keydown" / "keyup" - Tasto premuto/rilasciato
 *   "submit" - Form inviato
 *   "change" - Valore di input cambiato
 *   "focus" / "blur" - Elemento riceve/perde focus
 *   "load" - Risorsa caricata
 */