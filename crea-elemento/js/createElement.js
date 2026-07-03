/**
 * Crea un nuovo elemento HTML con tag, classe e testo opzionali.
 * 
 * Questa funzione semplifica la creazione dinamica di elementi DOM, 
 * riducendo il codice boilerplate necessario. Particolarmente utile per:
 * - Generazione dinamica di interfacce utente
 * - Popolamento di liste e tabelle
 * - Creazione di componenti riutilizzabili
 * - Manipolazione del DOM in risposta a eventi utente
 * - Sviluppo di single-page applications
 */

function crea(tag, classe = "", testo = "") {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (testo) el.textContent = testo;
    return el;
}

// Demo: ogni secondo crea un nuovo div con classe e testo
let counter = 1;
setInterval(() => {
    const box = crea("div", "box", `Elemento ${counter++}`);
    document.body.appendChild(box);
}, 2000);

/**
 * Dettagli implementativi:
 * - document.createElement(tag) crea un nuovo elemento con il tag specificato
 * - className assegna la classe CSS all'elemento
 * - textContent imposta il contenuto testuale (sicuro contro XSS)
 * - La funzione restituisce l'elemento creato, pronto per essere appeso al DOM
 * 
 * Note:
 * - Se classe è una stringa vuota, non viene applicata nessuna classe
 * - Se testo è una stringa vuota, l'elemento sarà vuoto
 * - Per aggiungere più classi, separarle con spazi: "classe1 classe2"
 * - Per aggiungere HTML invece di testo, usare innerHTML dopo la creazione
 */