export * from "./cambia-colore/js/colorChanger.js";
export * from "./numero-casuale/js/randomNumber.js";
export * from "./selettore-rapido/js/shortcut.js";
export * from "./crea-elemento/js/createElement.js";
export * from "./on-listener/js/eventListener.js";
export * from "./log-color/js/colorLogger.js";
export * from "./fade-in/js/animations.js";

/* questo file serve come punto di ingresso principale e serve per exportare tutte le funzioni del progetto in un unica "libreria"
 funzionamento:
 - importa tutti i moduli dalle varie cartelle 
 -li riesporta tutti insieme
Questo serve per poter usare tutte le funzioni del progetto con un solo import:

import * as utils from "./index.js";
utils.cambiaColore(document.body);
*/