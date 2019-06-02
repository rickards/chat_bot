var Omegle = require("omegle-node");
var { closeStream, writeStream } = require("./stream.js");

var strangerTimout = false;
var timeout = 120000;

var om1 = new Omegle(), om2 = new Omegle();

function close() {
    closeStream();
    om1.reloadReCAPTCHA();
    om2.reloadReCAPTCHA();
    process.exit();
}

function timeoutManager() {
    strangerTimout && clearTimeout(strangerTimout);
    strangerTimout = setTimeout(close, timeout);
}


om1.language = "pt";
om2.language = "pt";

// Estranho 1

om1.on('omerror', function (err) {
    console.log('Stranger-1 error: ' + err);
});

om1.on('connected', function () {
    console.log('Stranger-1 connected');
    timeoutManager();
});

om1.on('gotMessage', function (msg) {
    timeoutManager();
    console.log('Stranger-1: ' + msg);
    om2.connected && om2.send(msg);
    writeStream("person-1: " + msg);
});

om1.on('typing', function () {
    timeoutManager();
    om2.startTyping();
});

om1.on('stoppedTyping', function () {
    timeoutManager();
    om2.stopTyping();
});

om1.on('strangerDisconnected', function () {
    console.log('Stranger-1 disconnected.');
    close();
});

// Estranho 2

om2.on('omerror', function (err) {
    console.log('Stranger-2 error: ' + err);
});

om2.on('connected', function () {
    console.log('Stranger-2 connected');
    timeoutManager();
});

om2.on('gotMessage', function (msg) {
    timeoutManager();
    console.log('Stranger-2: ' + msg);
    om1.connected && om1.send(msg);
    writeStream("person-2: " + msg);
});

om2.on('typing', function () {
    timeoutManager();
    om1.startTyping();
});

om2.on('stoppedTyping', function () {
    timeoutManager();
    om1.stopTyping();
});

om2.on('strangerDisconnected', function () {
    console.log('Stranger-2 disconnected.');
    close();
});

om1.connect();
om2.connect();
timeoutManager();
