var fs = require("fs");

var writeStream;
var filePath;
var isOpennedStream = false;

// Abre a conexão com o arquivo
openStream = function () {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds() + "-" + today.getMilliseconds();
    var dateTime = date + '-' + time;
    var filePath = "data/" + dateTime + ".txt";

    writeStream = fs.createWriteStream(filePath, { flags: 'a' });

    writeStream.on('finish', () => {
        console.log('Dados salvos com sucesso!');
    });
    isOpennedStream = true;
}

// Fecha a stream
module.exports.closeStream = function () {
    isOpennedStream && writeStream.end();
}

// Escreve no arquivo
module.exports.writeStream = function (message) {
    if (!isOpennedStream) openStream();
    writeStream.write(message + "\n");
};
