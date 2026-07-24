/**
 * Funzioni per interagire in sicurezza con il localStorage del browser.
 * 
 * Questa utility fornisce un wrapper sicuro per localStorage, occupandosi
 * di serializzare e deserializzare automaticamente oggetti e array in JSON,
 * e catturando errori comuni (es. quota di storage superata, restrizioni sulla
 * privacy o modalità di navigazione in incognito attiva).
 * 
 * Utili per:
 * - Salvare preferenze dell'utente (es. tema scuro/chiaro)
 * - Salvare dati della sessione o token di autenticazione
 * - Memorizzare lo stato del carrello in e-commerce locali
 * - Caching di risposte API per ridurre le chiamate di rete
 */

/**
 * Salva un valore nell'archivio locale associato alla chiave fornita.
 * Serializza automaticamente oggetti e array in JSON.
 * 
 * @param {string} chiave - La chiave di archiviazione.
 * @param {*} valore - Il valore da salvare (qualsiasi tipo serializzabile).
 * @returns {boolean} True se il salvataggio è andato a buon fine, false altrimenti.
 */
export function salvaInArchivio(chiave, valore) {
    try {
        const valoreSerializzato = JSON.stringify(valore);
        window.localStorage.setItem(chiave, valoreSerializzato);
        return true;
    } catch (errore) {
        console.error(`[ArchivioLocale] Errore nel salvataggio della chiave "${chiave}":`, errore);
        return false;
    }
}

/**
 * Recupera un valore dall'archivio locale associato alla chiave fornita.
 * Deserializza automaticamente il JSON e restituisce il valore tipizzato.
 * In caso di chiave assente o errore, restituisce il valore di default.
 * 
 * @param {string} chiave - La chiave di archiviazione.
 * @param {*} valoreDefault - Il valore da restituire in caso di errore o chiave mancante (default: null).
 * @returns {*} Il valore salvato deserializzato o il valoreDefault.
 */
export function recuperaDaArchivio(chiave, valoreDefault = null) {
    try {
        const elemento = window.localStorage.getItem(chiave);
        if (elemento === null) {
            return valoreDefault;
        }
        return JSON.parse(elemento);
    } catch (errore) {
        console.error(`[ArchivioLocale] Errore nella lettura della chiave "${chiave}":`, errore);
        return valoreDefault;
    }
}

/**
 * Rimuove una chiave e il relativo valore dall'archivio locale.
 * 
 * @param {string} chiave - La chiave da rimuovere.
 * @returns {boolean} True se la rimozione è riuscita, false altrimenti.
 */
export function rimuoviDaArchivio(chiave) {
    try {
        window.localStorage.removeItem(chiave);
        return true;
    } catch (errore) {
        console.error(`[ArchivioLocale] Errore nella rimozione della chiave "${chiave}":`, errore);
        return false;
    }
}

/**
 * Rimuove tutte le chiavi e i valori memorizzati nell'archivio locale per il dominio corrente.
 * 
 * @returns {boolean} True se lo svuotamento è riuscito, false altrimenti.
 */
export function svuotaArchivio() {
    try {
        window.localStorage.clear();
        return true;
    } catch (errore) {
        console.error("[ArchivioLocale] Errore durante lo svuotamento dell'archivio locale:", errore);
        return false;
    }
}

// DEMO - Commentate per uso tramite CDN
// Demo: form interattivo per la gestione del profilo utente salvato in localStorage
// document.addEventListener('DOMContentLoaded', () => {
//     const saveBtn = document.getElementById('saveBtn');
//     const deleteBtn = document.getElementById('deleteBtn');
//     const nameInput = document.getElementById('nameInput');
//     const roleInput = document.getElementById('roleInput');
//     const rawOutput = document.getElementById('rawOutput');
//     const userDisplay = document.getElementById('userDisplay');
//     
//     const CHIAVE_STORAGE = 'demo_profilo_utente';
//     
//     const aggiornaVista = () => {
//         const profilo = recuperaDaArchivio(CHIAVE_STORAGE, null);
//         const rawProfile = window.localStorage.getItem(CHIAVE_STORAGE);
//         
//         if (profilo) {
//             userDisplay.textContent = `Profilo: ${profilo.nome} (${profilo.ruolo})`;
//             rawOutput.textContent = rawProfile || '{}';
//             nameInput.value = profilo.nome;
//             roleInput.value = profilo.ruolo;
//         } else {
//             userDisplay.textContent = 'Nessun profilo salvato.';
//             rawOutput.textContent = 'Storage vuoto (o chiave rimossa)';
//             nameInput.value = '';
//             roleInput.value = 'developer';
//         }
//     };
//     
//     saveBtn.addEventListener('click', () => {
//         const nome = nameInput.value.trim();
//         const ruolo = roleInput.value;
//         
//         if (nome) {
//             const utente = { nome, ruolo, dataAggiornamento: new Date().toISOString() };
//             const successo = salvaInArchivio(CHIAVE_STORAGE, utente);
//             if (successo) {
//                 aggiornaVista();
//             }
//         } else {
//             alert('Inserisci un nome prima di salvare!');
//         }
//     });
//     
//     deleteBtn.addEventListener('click', () => {
//         const successo = rimuoviDaArchivio(CHIAVE_STORAGE);
//         if (successo) {
//             aggiornaVista();
//         }
//     });
//     
//     // Esegui la prima lettura all'avvio della pagina
//     aggiornaVista();
// });

/**
 * Dettagli implementativi:
 * - JSON.stringify / JSON.parse: Gestiscono la conversione di dati complessi (oggetti, array, numeri, booleani)
 *   in stringhe per l'archiviazione e viceversa, mantenendo i tipi originali all'estrazione.
 * - Gestione Eccezioni: Previene crash dell'applicazione su browser con cookie disabilitati,
 *   in modalità privata (es. vecchi Safari) o quando lo spazio massimo consentito (generalmente 5MB) viene esaurito.
 * 
 * Uso in React:
 * Queste funzioni sono perfette per creare un hook personalizzato `useLocalStorage`:
 * 
 * Esempio:
 * function useArchivioLocale(chiave, valoreIniziale) {
 *   const [valoreMemorizzato, setValoreMemorizzato] = useState(() => {
 *     return recuperaDaArchivio(chiave, valoreIniziale);
 *   });
 * 
 *   const setValore = (valore) => {
 *     const daMemorizzare = valore instanceof Function ? valore(valoreMemorizzato) : valore;
 *     setValoreMemorizzato(daMemorizzare);
 *     salvaInArchivio(chiave, daMemorizzare);
 *   };
 * 
 *   return [valoreMemorizzato, setValore];
 * }
 */
