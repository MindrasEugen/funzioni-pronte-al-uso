/**
 * Funzioni per la formattazione di date e calcolo del tempo relativo in italiano.
 * 
 * Questa utility facilita la gestione e la visualizzazione delle date nelle 
 * interfacce utente, fornendo sia una formattazione localizzata personalizzabile 
 * (tramite Intl.DateTimeFormat), sia un calcolo intuitivo del tempo relativo 
 * trascorso o futuro (es. "3 ore fa", "tra 2 giorni").
 * 
 * Utile per:
 * - Visualizzare data e ora in formato italiano (breve, esteso o completo)
 * - Feed di notizie, commenti o post (es. "pubblicato 5 minuti fa")
 * - Storico attività o notifiche
 * - Dashboard e reportistica
 */

/**
 * Converte un input data (Date, stringa o timestamp) in un oggetto Date valido.
 * Solleva un errore o restituisce null in caso di input non valido.
 * 
 * @param {*} dataInput - La data in ingresso.
 * @returns {Date|null} Oggetto Date valido o null.
 */
function validaData(dataInput) {
    if (!dataInput) return null;
    const data = new Date(dataInput);
    return isNaN(data.getTime()) ? null : data;
}

/**
 * Formatta una data in italiano secondo lo stile specificato.
 * Accetta Date, stringhe ISO o timestamp.
 * 
 * @param {Date|string|number} dataInput - La data da formattare.
 * @param {string} stile - Lo stile desiderato: 'breve' (24/07/2026), 'estesa' (24 luglio 2026), 'completa' (venerdì 24 luglio 2026), 'ora' (12:30).
 * @returns {string} La data formattata in italiano o stringa vuota in caso di errore.
 */
export function formattaData(dataInput, stile = 'breve') {
    const data = validaData(dataInput);
    if (!data) return "";

    const opzioni = {};
    switch (stile) {
        case 'breve':
            opzioni.day = '2-digit';
            opzioni.month = '2-digit';
            opzioni.year = 'numeric';
            break;
        case 'estesa':
            opzioni.day = 'numeric';
            opzioni.month = 'long';
            opzioni.year = 'numeric';
            break;
        case 'completa':
            opzioni.weekday = 'long';
            opzioni.day = 'numeric';
            opzioni.month = 'long';
            opzioni.year = 'numeric';
            break;
        case 'ora':
            opzioni.hour = '2-digit';
            opzioni.minute = '2-digit';
            break;
        default:
            opzioni.day = '2-digit';
            opzioni.month = '2-digit';
            opzioni.year = 'numeric';
    }

    try {
        return new Intl.DateTimeFormat('it-IT', opzioni).format(data);
    } catch (e) {
        console.error("[FormatDate] Errore nella formattazione:", e);
        return "";
    }
}

/**
 * Calcola la distanza temporale relativa tra la data fornita e il momento attuale,
 * restituendo una stringa localizzata in italiano (es. "10 minuti fa", "tra 3 ore").
 * 
 * @param {Date|string|number} dataInput - La data di riferimento passata o futura.
 * @returns {string} L'etichetta del tempo relativo (es. "ieri", "2 ore fa", etc.).
 */
export function tempoRelativo(dataInput) {
    const data = validaData(dataInput);
    if (!data) return "";

    const ora = Date.now();
    const diffMs = data.getTime() - ora;
    const diffSecondi = Math.round(diffMs / 1000);
    const absSecondi = Math.abs(diffSecondi);

    // Se è meno di 10 secondi, diciamo "giusto ora" o "tra poco"
    if (absSecondi < 10) {
        return diffSecondi >= 0 ? "tra poco" : "giusto ora";
    }

    const èPassato = diffSecondi < 0;

    // Definiamo le unità di tempo in secondi
    const MINUTO = 60;
    const ORA = 3600;
    const GIORNO = 86400;
    const SETTIMANA = 604800;
    const MESE = 2592000;
    const ANNO = 31536000;

    let valore = 0;
    let unita = "";

    if (absSecondi < MINUTO) {
        valore = absSecondi;
        unita = valore === 1 ? "secondo" : "secondi";
    } else if (absSecondi < ORA) {
        valore = Math.floor(absSecondi / MINUTO);
        unita = valore === 1 ? "minuto" : "minuti";
    } else if (absSecondi < GIORNO) {
        valore = Math.floor(absSecondi / ORA);
        unita = valore === 1 ? "ora" : "ore";
    } else if (absSecondi < SETTIMANA) {
        valore = Math.floor(absSecondi / GIORNO);
        if (valore === 1) {
            return èPassato ? "ieri" : "domani";
        }
        unita = "giorni";
    } else if (absSecondi < MESE) {
        valore = Math.floor(absSecondi / SETTIMANA);
        unita = valore === 1 ? "settimana" : "settimane";
    } else if (absSecondi < ANNO) {
        valore = Math.floor(absSecondi / MESE);
        unita = valore === 1 ? "mese" : "mesi";
    } else {
        valore = Math.floor(absSecondi / ANNO);
        unita = valore === 1 ? "anno" : "anni";
    }

    // Mappatura per il singolare naturale in italiano
    const singolari = {
        secondo: { passato: "un secondo fa", futuro: "tra un secondo" },
        minuto: { passato: "un minuto fa", futuro: "tra un minuto" },
        ora: { passato: "un'ora fa", futuro: "tra un'ora" },
        settimana: { passato: "una settimana fa", futuro: "tra una settimana" },
        mese: { passato: "un mese fa", futuro: "tra un mese" },
        anno: { passato: "un anno fa", futuro: "tra un anno" }
    };

    if (singolari[unita]) {
        return èPassato ? singolari[unita].passato : singolari[unita].futuro;
    }

    // Costruiamo la frase plurale in base al fatto che sia passato o futuro
    if (èPassato) {
        return `${valore} ${unita} fa`;
    } else {
        return `tra ${valore} ${unita}`;
    }
}

// DEMO - Commentate per uso tramite CDN
// Demo: aggiorna dinamicamente i formati di data e i tempi relativi inseriti dall'utente
// document.addEventListener('DOMContentLoaded', () => {
//     const dateSelector = document.getElementById('dateSelector');
//     const formatBreve = document.getElementById('formatBreve');
//     const formatEsteso = document.getElementById('formatEsteso');
//     const formatCompleto = document.getElementById('formatCompleto');
//     const formatOra = document.getElementById('formatOra');
//     const relativeText = document.getElementById('relativeText');
//     
//     const aggiornaDati = () => {
//         const dataScelta = dateSelector.value;
//         if (!dataScelta) return;
//         
//         formatBreve.textContent = formattaData(dataScelta, 'breve');
//         formatEsteso.textContent = formattaData(dataScelta, 'estesa');
//         formatCompleto.textContent = formattaData(dataScelta, 'completa');
//         formatOra.textContent = formattaData(dataScelta, 'ora');
//         relativeText.textContent = tempoRelativo(dataScelta);
//     };
//     
//     // Imposta il selettore alla data odierna di default
//     const oggi = new Date();
//     const tzOffset = oggi.getTimezoneOffset() * 60000; // offset in ms
//     const localISOTime = new Date(oggi.getTime() - tzOffset).toISOString().slice(0, 16);
//     dateSelector.value = localISOTime;
//     
//     dateSelector.addEventListener('input', aggiornaDati);
//     aggiornaDati();
//     
//     // Esegui un aggiornamento periodico per il tempo relativo (ogni 10s)
//     setInterval(aggiornaDati, 10000);
// });

/**
 * Dettagli implementativi:
 * - Intl.DateTimeFormat: API nativa del browser standard per la formattazione internazionalizzata,
 *   evitando dipendenze esterne pesanti come Moment.js o Date-fns.
 * - Precisione del tempo relativo: Le soglie arrotondano i valori per produrre frasi colloquiali 
 *   naturali ("ieri" / "domani" per differenze di 1 giorno, "fa un mese" invece di "1 mesi fa").
 * 
 * Uso in React:
 * Perfetto per creare un componente `<TempoRelativo />` che si aggiorna periodicamente:
 * 
 * Esempio:
 * function TempoRelativo({ data }) {
 *   const [testo, setTesto] = useState(() => tempoRelativo(data));
 * 
 *   useEffect(() => {
 *     setTesto(tempoRelativo(data));
 *     const intervallo = setInterval(() => {
 *       setTesto(tempoRelativo(data));
 *     }, 30000); // Aggiorna ogni 30s
 * 
 *     return () => clearInterval(intervallo);
 *   }, [data]);
 * 
 *   return <span>{testo}</span>;
 * }
 */
