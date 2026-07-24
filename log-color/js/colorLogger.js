/**
 * Stampa un messaggio colorato e formattato nella console del browser.
 * 
 * Questa funzione sfrutta la capability CSS di console.log() per formattare 
 * l'output della console con colori e stili personalizzati. 
 * Particolarmente utile per:
 * - Debug più leggibile e organizzato
 * - Distinguere visivamente diversi tipi di messaggi (errori, warning, info)
 * - Creare output di log più professionali
 * - Sviluppo e testing di applicazioni web
 * - Creazione di librerie con messaggi di debug formattati
 */

export function stampaColore(msg, colore = "cyan") {
    console.log(`%c${msg}`, `color: ${colore}; font-weight: bold;`);
}

// DEMO - Commentate per uso tramite CDN
// Demo: stampa esempi alla partenza
// console.log("%c=== Demo logColor ===", "color: #333; font-size: 16px; font-weight: bold;");
// stampaColore("Messaggio predefinito (cyan)");
// stampaColore("Messaggio di errore", "red");
// stampaColore("Messaggio di warning", "orange");
// stampaColore("Messaggio di successo", "green");
// stampaColore("Messaggio informativo", "blue");
//
// Demo: bottone per testare altri colori
// const testBtn = document.getElementById("testBtn");
// testBtn.addEventListener("click", () => {
//     stampaColore("Test messaggio 1", "purple");
//     stampaColore("Test messaggio 2", "darkblue");
//     stampaColore("Test messaggio 3 - Bold Magenta", "magenta");
//     stampaColore("Test messaggio 4", "crimson");
// });

/**
 * Dettagli implementativi:
 * - `%c` è un placeholder CSS in console.log() che applica gli stili al testo successivo
 * - Il primo argomento dopo il formato è il messaggio da stampare
 * - Il secondo argomento è la stringa CSS con gli stili da applicare
 * - Puoi usare qualsiasi proprietà CSS valida (color, font-weight, font-size, ecc.)
 * - Gli stili vengono applicati solo al messaggio, non all'intera riga della console
 * 
 * Sintassi estesa:
 *   console.log(`%cMessaggio`, `color: red; font-size: 20px; background: yellow;`);
 * 
 * Colori CSS supportati:
 *   - Nomi di colori: "red", "blue", "green", "orange", "purple", ecc.
 *   - Codici esadecimali: "#ff0000", "#00ff00", ecc.
 *   - RGB: "rgb(255, 0, 0)"
 *   - RGBA: "rgba(255, 0, 0, 0.5)"
 *   - HSL: "hsl(120, 100%, 50%)"
 *   - HSLA: "hsla(120, 100%, 50%, 0.5)"
 */