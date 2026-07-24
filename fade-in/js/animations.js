/**
 * Applica un effetto di dissolvenza in entrata a un elemento DOM.
 * 
 * Questa funzione crea un effetto di transizione fluida dove un elemento 
 * passa da invisibile (opacity: 0) a completamente visibile (opacity: 1).
 * Particolarmente utile per:
 * - Animazioni di entrata per elementi che appaiono al caricamento
 * - Transizioni fluide tra stati UI
 * - Effetti di "reveal" per contenuti dinamicamente caricati
 * - Migliorare lesperienza utente con animazioni leggere
 * - Creare interfacce più moderne e professionali
 */

export function dissolvenza(el, durata = 2000) {
    el.style.opacity = 0;
    el.style.transition = `opacity ${durata}ms ease`;
    requestAnimationFrame(() => el.style.opacity = 1);
}

// DEMO - Commentate per uso tramite CDN
// Demo: applica fadeIn a tutti i box con durate scalari
// document.addEventListener('DOMContentLoaded', () => {
//     const boxes = document.querySelectorAll('.box');
//
//     boxes.forEach((box, index) => {
//         // Aspetta un po' per ogni box per effetto a cascata
//         setTimeout(() => {
//             dissolvenza(box, 200 + index * 200);
//         }, index * 200);
//     });
//
//     // Bottone reset
//     const resetBtn = document.getElementById('resetBtn');
//     resetBtn.addEventListener('click', () => {
//         boxes.forEach(box => {
//             box.style.opacity = 0;
//         });
//
//         setTimeout(() => {
//             boxes.forEach((box, index) => {
//                 setTimeout(() => {
//                     dissolvenza(box, 200 + index * 200);
//                 }, index * 200);
//             });
//         }, 100);
//     });
// });

/**
 * Dettagli implementativi:
 * - el.style.opacity = 0: imposta l'elemento come completamente trasparente
 * - el.style.transition: definisce la proprietà da animare, durata e timing function
 * - requestAnimationFrame: garantisce che l'opacity=1 venga impostato nel prossimo frame,
 *   permettendo al browser di applicare correttamente la transizione
 * 
 * Timing functions supportate:
 *   - ease (predefinita): inizia lento, accelera, finisce lento
 *   - linear: velocità costante
 *   - ease-in: inizia lento
 *   - ease-out: finisce lento
 *   - ease-in-out: inizia e finisce lento
 *   - cubic-bezier(n,n,n,n): funzione personalizzata
 * 
 * Note:
 * - Se l'elemento ha già opacity != 0, l'animazione non sarà visibile
 * - La proprietà transition viene applicata direttamente allo stile inline
 * - Per animazioni più complesse, considerare CSS animations o libraries
 */