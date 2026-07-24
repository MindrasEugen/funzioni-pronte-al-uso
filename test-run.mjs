/**
 * Script di test per verificare tutte le funzioni dei moduli creati.
 * Testa: antirimbalzo, limita, salvaInArchivio, recuperaDaArchivio, rimuoviDaArchivio, svuotaArchivio,
 *        formattaData, tempoRelativo, stampaColore, dissolvenza, ascolta, cambiaColore, $, coloreCasuale
 * 
 * Esegui con: node test-run.mjs
 */

import { fileURLToPath, pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Mock di window.localStorage per Node.js ─────────────────────────────────
const mockStore = {};
const mockLocalStorage = {
    getItem: (key) => (key in mockStore ? mockStore[key] : null),
    setItem: (key, val) => { mockStore[key] = String(val); },
    removeItem: (key) => { delete mockStore[key]; },
    clear: () => { for (const k of Object.keys(mockStore)) delete mockStore[k]; },
};
global.window = { localStorage: mockLocalStorage };

// ── Mock di document per test DOM ──────────────────────────────────────────────
const mockElements = {};
global.document = {
    querySelector: (selector) => mockElements[selector] || null,
    createElement: (tag) => ({ tag, style: {}, className: '', textContent: '' })
};

// Mock per requestAnimationFrame (per dissolvenza)
if (!globalThis.requestAnimationFrame) {
    globalThis.requestAnimationFrame = (fn) => fn();
}

// ── Importazione moduli ──────────────────────────────────────────────────────
const { antirimbalzo, limita } = await import(
    pathToFileURL(join(__dirname, 'debounce-throttle', 'js', 'debounceThrottle.js')).href
);
const { salvaInArchivio, recuperaDaArchivio, rimuoviDaArchivio, svuotaArchivio } = await import(
    pathToFileURL(join(__dirname, 'gestisci-storage', 'js', 'storageHelper.js')).href
);
const { formattaData, tempoRelativo } = await import(
    pathToFileURL(join(__dirname, 'formato-data', 'js', 'formatDate.js')).href
);
const { stampaColore } = await import(
    pathToFileURL(join(__dirname, 'log-color', 'js', 'colorLogger.js')).href
);
const { dissolvenza } = await import(
    pathToFileURL(join(__dirname, 'fade-in', 'js', 'animations.js')).href
);
const { ascolta } = await import(
    pathToFileURL(join(__dirname, 'on-listener', 'js', 'eventListener.js')).href
);
const { cambiaColore, coloreCasuale, cambiaSfondo, cambiaTesto } = await import(
    pathToFileURL(join(__dirname, 'cambia-colore', 'js', 'colorChanger.js')).href
);
const { $ } = await import(
    pathToFileURL(join(__dirname, 'selettore-rapido', 'js', 'shortcut.js')).href
);

// ── Utilità di test ──────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function assert(descrizione, condizione) {
    if (condizione) {
        console.log(`  ✅ PASS: ${descrizione}`);
        passed++;
    } else {
        console.error(`  ❌ FAIL: ${descrizione}`);
        failed++;
    }
}

// ── Test 1: antirimbalzo ─────────────────────────────────────────────────────
console.log('\n📦 Modulo: antirimbalzo (debounce-throttle/js/debounceThrottle.js)');

await new Promise((resolve) => {
    let counter = 0;
    const fn = antirimbalzo(() => counter++, 50);
    fn(); fn(); fn();
    setTimeout(() => {
        assert('antirimbalzo: 3 chiamate rapide → 1 sola esecuzione', counter === 1);
        resolve();
    }, 120);
});

await new Promise((resolve) => {
    let counter = 0;
    const fn = antirimbalzo(() => counter++, 50);
    fn();
    setTimeout(() => fn(), 80);
    setTimeout(() => {
        assert('antirimbalzo: 2 chiamate separate (>delay) → 2 esecuzioni', counter === 2);
        resolve();
    }, 220);
});

// ── Test 2: limita ───────────────────────────────────────────────────────────
console.log('\n📦 Modulo: limita (debounce-throttle/js/debounceThrottle.js)');

await new Promise((resolve) => {
    let counter = 0;
    const fn = limita(() => counter++, 100);
    fn(); fn(); fn();
    setTimeout(() => {
        assert('limita: 3 chiamate rapide → 1 sola esecuzione', counter === 1);
        resolve();
    }, 50);
});

await new Promise((resolve) => {
    let counter = 0;
    const fn = limita(() => counter++, 50);
    fn();
    setTimeout(() => fn(), 100);
    setTimeout(() => {
        assert('limita: 2 chiamate separate (>limit) → 2 esecuzioni', counter === 2);
        resolve();
    }, 200);
});

// ── Test 3: salvaInArchivio / recuperaDaArchivio ────────────────────────────────────
console.log('\n📦 Modulo: salvaInArchivio / recuperaDaArchivio (gestisci-storage/js/storageHelper.js)');

{
    const ok = salvaInArchivio('test_stringa', 'ciao');
    assert('salvaInArchivio: stringa → restituisce true', ok === true);

    const val = recuperaDaArchivio('test_stringa');
    assert('recuperaDaArchivio: stringa → valore corretto', val === 'ciao');
}

{
    const obj = { nome: 'Mario', eta: 30 };
    salvaInArchivio('test_oggetto', obj);
    const recuperato = recuperaDaArchivio('test_oggetto');
    assert('salvaInArchivio/recuperaDaArchivio: oggetto → struttura preservata', recuperato.nome === 'Mario' && recuperato.eta === 30);
}

{
    salvaInArchivio('test_numero', 42);
    const num = recuperaDaArchivio('test_numero');
    assert('salvaInArchivio/recuperaDaArchivio: numero → tipo preservato', num === 42);
}

{
    salvaInArchivio('test_bool', false);
    const bool = recuperaDaArchivio('test_bool');
    assert('salvaInArchivio/recuperaDaArchivio: booleano false → tipo preservato', bool === false);
}

{
    salvaInArchivio('test_array', [1, 'due', true]);
    const arr = recuperaDaArchivio('test_array');
    assert('salvaInArchivio/recuperaDaArchivio: array → struttura preservata', Array.isArray(arr) && arr[1] === 'due');
}

{
    const def = recuperaDaArchivio('chiave_inesistente', 'default');
    assert('recuperaDaArchivio: chiave mancante → valore di default', def === 'default');
}

{
    const nullVal = recuperaDaArchivio('chiave_inesistente_2');
    assert('recuperaDaArchivio: chiave mancante senza default → null', nullVal === null);
}

// ── Test 4: rimuoviDaArchivio ────────────────────────────────────────────────────
console.log('\n📦 Modulo: rimuoviDaArchivio (gestisci-storage/js/storageHelper.js)');

{
    salvaInArchivio('test_rimuovi', 'da_eliminare');
    const ok = rimuoviDaArchivio('test_rimuovi');
    assert('rimuoviDaArchivio: restituisce true', ok === true);

    const dopoRimozione = recuperaDaArchivio('test_rimuovi', null);
    assert('rimuoviDaArchivio: chiave rimossa → recuperaDaArchivio restituisce null', dopoRimozione === null);
}

// ── Test 5: svuotaArchivio ─────────────────────────────────────────────────────
console.log('\n📦 Modulo: svuotaArchivio (gestisci-storage/js/storageHelper.js)');

{
    salvaInArchivio('k1', 'val1');
    salvaInArchivio('k2', 'val2');
    const ok = svuotaArchivio();
    assert('svuotaArchivio: restituisce true', ok === true);

    const dopo1 = recuperaDaArchivio('k1', null);
    const dopo2 = recuperaDaArchivio('k2', null);
    assert('svuotaArchivio: archivio completamente vuoto', dopo1 === null && dopo2 === null);
}

// ── Test 6: formattaData ─────────────────────────────────────────────────────
console.log('\n📦 Modulo: formattaData (formato-data/js/formatDate.js)');

{
    const data = new Date(2026, 6, 24); // 24 luglio 2026
    const breve = formattaData(data, 'breve');
    assert(`formattaData 'breve' → DD/MM/YYYY (ottenuto: ${breve})`, /\d{2}\/\d{2}\/\d{4}/.test(breve));
}

{
    const data = new Date(2026, 6, 24);
    const estesa = formattaData(data, 'estesa');
    assert(`formattaData 'estesa' → contiene "luglio" (ottenuto: ${estesa})`, estesa.toLowerCase().includes('luglio'));
}

{
    const data = new Date(2026, 6, 24);
    const completa = formattaData(data, 'completa');
    assert(`formattaData 'completa' → lunghezza >15 caratteri (ottenuto: ${completa})`, completa.length > 15);
}

{
    const ora = formattaData(new Date(), 'ora');
    assert(`formattaData 'ora' → formato HH:MM (ottenuto: ${ora})`, /\d{2}:\d{2}/.test(ora));
}

{
    const nonValida = formattaData('non-una-data');
    assert("formattaData: input non valido → stringa vuota", nonValida === '');
}

{
    const nulla = formattaData(null);
    assert("formattaData: input null → stringa vuota", nulla === '');
}

// ── Test 7: tempoRelativo ─────────────────────────────────────────────────────
console.log('\n📦 Modulo: tempoRelativo (formato-data/js/formatDate.js)');

{
    const oraData = new Date();
    const risultato = tempoRelativo(oraData);
    assert(`tempoRelativo: adesso → "giusto ora" o "tra poco" (ottenuto: "${risultato}")`, risultato === 'giusto ora' || risultato === 'tra poco');
}

{
    const treMinutiFa = new Date(Date.now() - 3 * 60 * 1000);
    const risultato = tempoRelativo(treMinutiFa);
    assert(`tempoRelativo: 3 minuti fa → "3 minuti fa" (ottenuto: "${risultato}")`, risultato === '3 minuti fa');
}

{
    const ieri = new Date(Date.now() - 25 * 60 * 60 * 1000);
    const risultato = tempoRelativo(ieri);
    assert(`tempoRelativo: ~25 ore fa → "ieri" (ottenuto: "${risultato}")`, risultato === 'ieri');
}

{
    const traUnOra = new Date(Date.now() + 61 * 60 * 1000);
    const risultato = tempoRelativo(traUnOra);
    assert(`tempoRelativo: tra ~61 min → "tra un'ora" (ottenuto: "${risultato}")`, risultato === "tra un'ora");
}

{
    const nonValida = tempoRelativo('data-non-valida');
    assert("tempoRelativo: input non valido → stringa vuota", nonValida === '');
}

// ── Test 8: stampaColore ────────────────────────────────────────────────────
console.log('\n📦 Modulo: stampaColore (log-color/js/colorLogger.js)');

{
    const logSpy = [];
    const origLog = console.log;
    console.log = (...args) => logSpy.push(args);
    stampaColore('Ciao', 'red');
    console.log = origLog;
    assert('stampaColore: chiama console.log con placeholder %c', logSpy[0]?.[0] === '%cCiao');
    assert('stampaColore: include il colore nel secondo argomento', logSpy[0]?.[1].includes('red'));
}

{
    const logSpy = [];
    const origLog = console.log;
    console.log = (...args) => logSpy.push(args);
    stampaColore('Test default');
    console.log = origLog;
    assert('stampaColore: colore default → cyan', logSpy[0]?.[1].includes('cyan'));
}

// ── Test 9: dissolvenza ──────────────────────────────────────────────────────
console.log('\n📦 Modulo: dissolvenza (fade-in/js/animations.js)');

{
    // Mock di un elemento DOM minimale
    const mockEl = { style: {} };
    const origRAF = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = (fn) => fn();
    dissolvenza(mockEl, 500);
    globalThis.requestAnimationFrame = origRAF;
    assert('dissolvenza: opacity finale impostata a 1', mockEl.style.opacity == 1);
    assert('dissolvenza: transition impostata con durata 500ms', mockEl.style.transition === 'opacity 500ms ease');
}

// ── Test 10: ascolta ─────────────────────────────────────────────────────────
console.log('\n📦 Modulo: ascolta (on-listener/js/eventListener.js)');

{
    let eseguito = false;
    const mockEl = {
        _listeners: {},
        addEventListener(evt, cb) { this._listeners[evt] = cb; }
    };
    ascolta(mockEl, 'click', () => { eseguito = true; });
    mockEl._listeners['click']?.();
    assert('ascolta: aggiunge il listener correttamente', eseguito === true);
}

// ── Test 11: cambiaColore ──────────────────────────────────────────────────────
console.log('\n📦 Modulo: cambiaColore (cambia-colore/js/colorChanger.js)');

{
    // Testa cambiaColore
    const mockEl = { style: {} };
    cambiaColore(mockEl);
    assert('cambiaColore: imposta backgroundColor', mockEl.style.backgroundColor !== undefined);
    assert('cambiaColore: valore è stringa RGB', typeof mockEl.style.backgroundColor === 'string' && mockEl.style.backgroundColor.startsWith('rgb('));
}

{
    // Testa coloreCasuale
    const colore = coloreCasuale();
    assert('coloreCasuale: restituisce stringa', typeof colore === 'string');
    assert('coloreCasuale: formato RGB valido', /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(colore));
}

{
    // Testa cambiaSfondo
    const mockEl = { style: {} };
    cambiaSfondo(mockEl);
    assert('cambiaSfondo: imposta backgroundColor', mockEl.style.backgroundColor !== undefined);
}

{
    // Testa cambiaTesto
    const mockEl = { style: {} };
    cambiaTesto(mockEl);
    assert('cambiaTesto: imposta color', mockEl.style.color !== undefined);
}

// ── Test 12: $ (selettore-rapido) ────────────────────────────────────────────────
console.log('\n📦 Modulo: $ (selettore-rapido/js/shortcut.js)');

{
    // Aggiungi un elemento mock al document
    const testEl = { tagName: 'DIV', id: 'test-div' };
    mockElements['#test-div'] = testEl;
    
    const risultato = $('#test-div');
    assert('$: trova elemento per ID', risultato === testEl);
}

{
    // Test selettore non trovato
    const risultato = $('#non-esiste');
    assert('$: restituisce null per selettore inesistente', risultato === null);
}

// ── Riepilogo ──────────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════');
console.log(`📊 Risultato: ${passed} passati, ${failed} falliti su ${passed + failed} totali`);
if (failed === 0) {
    console.log('🎉 Tutti i test superati!');
} else {
    console.log('⚠️  Alcuni test hanno fallito. Controlla i messaggi sopra.');
    process.exit(1);
}
