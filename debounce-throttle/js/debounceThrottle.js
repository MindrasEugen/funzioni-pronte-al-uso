/**
 * Funzioni per limitare la frequenza di esecuzione di un'altra funzione.
 * 
 * antirimbalzo: Rimanda l'esecuzione di una funzione fino a quando non è trascorso 
 * un certo periodo di tempo dall'ultima volta che è stata invocata.
 * 
 * limita: Assicura che una funzione non venga eseguita più di una volta 
 * in un determinato intervallo di tempo.
 * 
 * Utili per:
 * - Ottimizzazione delle performance (riduzione dei calcoli/render)
 * - Chiamate API su input di ricerca (autocomplete)
 * - Eventi di scroll, resize o mousemove ad alta frequenza
 * - Prevenzione di click multipli accidentali sui pulsanti
 */

/**
 * Ritarda l'esecuzione della funzione fn fino a quando non sono trascorsi 
 * delay millisecondi dall'ultima chiamata.
 * 
 * @param {Function} fn - La funzione da eseguire.
 * @param {number} delay - Il ritardo in millisecondi.
 * @returns {Function} La funzione con antirimbalzo applicato.
 */
export function antirimbalzo(fn, delay = 300) {
    let timeoutId;
    return function (...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

/**
 * Limita l'esecuzione della funzione fn a non più di una volta ogni 
 * limit millisecondi.
 * 
 * @param {Function} fn - La funzione da eseguire.
 * @param {number} limit - Il limite di tempo in millisecondi.
 * @returns {Function} La funzione con limitazione di frequenza applicata.
 */
export function limita(fn, limit = 300) {
    let inThrottle;
    return function (...args) {
        const context = this;
        if (!inThrottle) {
            fn.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// DEMO - Commentate per uso tramite CDN
// Demo: monitoraggio degli eventi di input (antirimbalzo) e click (limita)
// document.addEventListener('DOMContentLoaded', () => {
//     const inputDemo = document.getElementById('inputDemo');
//     const outputDebounce = document.getElementById('outputDebounce');
//     const countInput = document.getElementById('countInput');
//     
//     const btnDemo = document.getElementById('btnDemo');
//     const outputThrottle = document.getElementById('outputThrottle');
//     const countClick = document.getElementById('countClick');
//     
//     let inputCounter = 0;
//     let debounceCounter = 0;
//     let clickCounter = 0;
//     let throttleCounter = 0;
//     
//     // ANTIRIMBALZO DEMO
//     const gestisciInputAntirimbalzo = antirimbalzo((valore) => {
//         debounceCounter++;
//         outputDebounce.textContent = valore || "(vuoto)";
//         countInput.textContent = `Eventi reali: ${inputCounter} | Chiamate effettive (Antirimbalzo): ${debounceCounter}`;
//     }, 500);
//     
//     inputDemo.addEventListener('input', (e) => {
//         inputCounter++;
//         countInput.textContent = `Eventi reali: ${inputCounter} | Chiamate effettive (Antirimbalzo): ${debounceCounter}`;
//         gestisciInputAntirimbalzo(e.target.value);
//     });
//     
//     // LIMITA DEMO
//     const gestisciClickLimitato = limita(() => {
//         throttleCounter++;
//         outputThrottle.textContent = `Eseguito alle: ${new Date().toLocaleTimeString()}`;
//         countClick.textContent = `Click reali: ${clickCounter} | Chiamate effettive (Limita): ${throttleCounter}`;
//     }, 1000);
//     
//     btnDemo.addEventListener('click', () => {
//         clickCounter++;
//         countClick.textContent = `Click reali: ${clickCounter} | Chiamate effettive (Limita): ${throttleCounter}`;
//         gestisciClickLimitato();
//     });
// });

/**
 * Dettagli implementativi:
 * - Closure: Entrambe le funzioni utilizzano le closure per mantenere lo stato
 *   (timeoutId per antirimbalzo, inThrottle per limita) tra le varie invocazioni.
 * - .apply(context, args): Preserva il contesto (this) e passa tutti i parametri
 *   originari alla funzione racchiusa.
 * 
 * Uso in React:
 * Per evitare che la funzione venga ricreata ad ogni render (perdendo lo stato interno
 * della closure), avvolgere la funzione ritornata in useMemo o utilizzare un hook dedicato:
 * 
 * Esempio:
 * const ricercaAntirimbalzo = useMemo(() => antirimbalzo((q) => fetchResults(q), 500), []);
 */
