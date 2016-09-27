/**

Driver para conectar los equipos analizadores

**/

function ConfigurationOfAnalyzer () {
  this.items = null;
}

ConfigurationOfAnalyzer.prototype.loadConfiguration = function (callback) {
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
	xobj.open('GET', '../driverforanalyzer.json', true); // file JSON
	xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
  };
  xobj.send(null);
};

ConfigurationOfAnalyzer.prototype.loadjscssfile = function (filename, filetype) {
  var fileref;
  
  if (filetype=="js"){ //if filename is a external JavaScript file
        fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
      document.body.appendChild(fileref);
};

ConfigurationOfAnalyzer.prototype.loadListJSFile = function () {
  this.loadConfiguration(this.onLoadConfigurationOfAnalyzer);
};


ConfigurationOfAnalyzer.prototype.onLoadConfigurationOfAnalyzer = function(response) {
  conf.items = JSON.parse(response);
  for ( pos = 0; pos < conf.items.length; pos++ ) {
    if ( conf.items[pos].nameFileJS.length > 0 )
      conf.loadjscssfile(conf.items[pos].nameFileJS, "js");
  }
};


function DriverForAnalyzer (newConfiguration) {
  var protocolASTM = new ProtocolASTM();
  var stringReceived = '';
  var configuration = newConfiguration;
  
  this.setProtocolASTM = function(newProtocolASTM) {
    protocolASTM = newProtocolASTM;
  };
  
  this.getProtocolASTM = function() {
    return protocolASTM;
  };

  this.setStringReceived = function(newStringReceived) {
    stringReceived = newStringReceived;
    
  };
  
  this.addStringReceived = function(newStringReceived) {
    stringReceived += newStringReceived;
    
  };

  this.getStringReceived = function() {
    return stringReceived;
  };
  
  this.setConfiguration = function(newConfiguration) {
    configuration = newConfiguration;
  };
  
  this.getConfiguration = function() {
    return configuration;
  };
  
}

Array.prototype.getIndexBy = function (name, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][name] == value) {
            return i;
        }
    }
    return -1;
};

DriverForAnalyzer.prototype.isResponseRequired = function () {
  // Obtener la última posición del string de datos recibidos
  var lastPosition = this.getStringReceived().length - 1;
  var asciiValue = this.getStringReceived().charCodeAt(lastPosition);
  var specialCharacters = this.getConfiguration().specialCharacters;
  if (typeof specialCharacters === "undefined")
    throw new Error( "No se encontraron caracteres especiales configurados para este driver." );
  var index = specialCharacters.getIndexBy("asciiValue", asciiValue);
  //var index = specialCharacters.indexOf(asciiValue);
  //var index = specialCharacters.findIndex(xobj => xobj.asciiValue==asciiValue);
  if ( index < 0 )
    return false;
  return specialCharacters[index].responseRequired;
};


DriverForAnalyzer.prototype.cleanSpecialCharacters = function (data) {
  var arraySpecialCharacters =  [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ];
  var newData = "";
  for (i = 0; i < data.length; i++) {
        ch = data.charCodeAt(i);
        // Buscar el caracter en el array de caracteres especiales
        if ( arraySpecialCharacters.indexOf(ch) === -1 ) {
            // Concatenar los caraceteres que NO son especiales
            newData += data.charAt(i);
        }
  }
  return newData;
};


DriverForAnalyzer.prototype.readingDataEntry = function (data) {
  // Concatenar los datos recibidos
  this.addStringReceived(data);
  // Nuevo string limpio de caracteres especiales
  var newStringReceived = this.cleanSpecialCharacters(this.getStringReceived());
  // Leer la data desde el protocolo ASTM
  var readStatus = this.getProtocolASTM().readInputData(newStringReceived);
  return readStatus;
};


DriverForAnalyzer.prototype.driverResponse = function () {
  // < Se debe heredar este metodo y crear la respuesta de cada Driver >
  return "";
};


DriverForAnalyzer.prototype.whenIsHeader = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return false;
};

DriverForAnalyzer.prototype.convertDataToHeaderASTM = function (data) {
  // < Se debe heredar este metodo y convertir la data >
  return "";
};

DriverForAnalyzer.prototype.whenIsPatient = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return false;
};

DriverForAnalyzer.prototype.convertDataToPatientASTM = function (data) {
  // < Se debe heredar este metodo y convertir la data >
  return "";
};

DriverForAnalyzer.prototype.whenIsOrder = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return "";
};

DriverForAnalyzer.prototype.convertDataToOrderASTM = function (data) {
  // < Se debe heredar este metodo y convertir la data >
  return "";
};

DriverForAnalyzer.prototype.whenIsResult = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return "";
};

DriverForAnalyzer.prototype.convertDataToResultASTM = function (data) {
  // < Se debe heredar este metodo y convertir la data >
  return "";
};

DriverForAnalyzer.prototype.whenIsQuery = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return "";
};

DriverForAnalyzer.prototype.convertDataToQueryASTM = function (data) {
  // < Se debe heredar este metodo y convertir la data >
  return "";
};

DriverForAnalyzer.prototype.whenIsFinalRecord = function (data) {
  // < Se debe heredar este metodo y retornar true, para covertir la data
  // en un mensaje ASTM, cuando se cumpla una condición >
  return "";
};

DriverForAnalyzer.prototype.convertDataToFinalRecordASTM = function (data) {
  // < Se debe heredar este metodo y convertir la data >
  return "";
};


// Se describe cuando se deben cambiar los datos
DriverForAnalyzer.prototype.toChangeData = function (data) {
  // Definir  variables locales
  var dataModified = "";

  switch (true) {
    case (this.whenIsHeader(data)):
      dataModified = this.convertDataToHeaderASTM(data);
      break;
    case (this.whenIsPatient(data)):
      dataModified = this.convertDataToPatientASTM(data);
      break;
    case (this.whenIsOrder(data)):
      dataModified = this.convertDataToOrderASTM(data);
      break;
    case (this.whenIsResult(data)):
      dataModified = this.convertDataToResultASTM(data);
      break;
    case (this.whenIsQuery(data)):
      dataModified = this.convertDataToQueryASTM(data);
      break;
    case (data.indexOf("Comment") != -1):
      console.log("Comment");
      break;
    case (this.whenIsFinalRecord(data)):
      dataModified = this.convertDataToFinalRecordASTM(data);
      break;
    default:
      console.log("Comment default");
  }

  // Retornar la Data
  return dataModified;
};


DriverForAnalyzer.prototype.responseDataEntry = function (readStatus) {
  // Definir la variable de salida
  var dataOutput = "";
  // Validar si requiere una respuesta del Driver
  if ( this.isResponseRequired() ) {
    // Validar que los datos de entrada se hayan leído correctamente
    if ( readStatus )
      // Respuesta del Driver
      dataOutput = this.driverResponse();
    // Limpiar el buffer de los datos recibidos
    this.setStringReceived("");
  }
  return dataOutput;
};

DriverForAnalyzer.prototype.readingAndResponseDataEntry = function (data) {
  // Definir variables locales
  var dataModified = "";
  var readStatus = false;
  // Validar si el dato es un formato ASTM válido
  if ( this.getProtocolASTM().isValidRecord(data) ) {
    // Leer los datos de entrada
    readStatus = this.readingDataEntry(data);
  } else {
    // Cambiar la Data
    dataModified = this.toChangeData(data);
    // Validar si el registro ASTM tiene un formato válido
    if ( this.getProtocolASTM().isValidRecord(dataModified) ) {
      // Leer la Data modificada
      readStatus = this.readingDataEntry(dataModified);
    }
  }
  // Respuesta del Driver
  return this.responseDataEntry(readStatus);
};


DriverForAnalyzer.prototype.saveProtocolAsText = function () {
  // Definir variables locales
  var fileManager = new FileManager();
  var arrayProtocol = [];
  var position;
  
  // Concatenar un caracter de fin de línea
  arrayProtocol = this.getProtocolASTM().getArrayWithFullPatientProtocol();
  for ( position = 0; position < arrayProtocol.length; position++ ) {
    arrayProtocol[position] += String.fromCharCode(10);
  }
  // Guardar el protocolo en el file system
  fileManager.writeToLocal("/Log/LogSerialPortToASTM.txt", arrayProtocol);
};

DriverForAnalyzer.prototype.sendResult = function () {
  // Definir variables locales
  var arrayProtocol = [];
  var position;
  var trama = "";
  
  // Obtener un array string con el protolo completo del paciente
  arrayProtocol = this.getProtocolASTM().getArrayWithFullPatientProtocol();
  for ( position = 0; position < arrayProtocol.length; position++ ) {
    arrayProtocol[position] += String.fromCharCode(10);
    // concatenar el array en un string 
    trama += arrayProtocol[position];
  }
  
  // Enviar el resultado a un servicio REST
  angular.injector(['ng', 'myApp.servicioDatos']).get('ServicioResultados').enviarResultado({ trama: trama, sistema: 'SIRIUS.SerialPortToASTM'});
};


DriverForAnalyzer.prototype.saveProtocolAsLocalFile = function () {
  // Definir variables locales
  var fileManager = new FileManager();
  var arrayProtocol = [];
  var position;
  
  // Concatenar un caracter de fin de línea
  arrayProtocol = this.getProtocolASTM().getArrayWithFullPatientProtocol();
  for ( position = 0; position < arrayProtocol.length; position++ ) {
    arrayProtocol[position] += String.fromCharCode(10);
  }
  // Guardar el protocolo en un archivo local
  var blob = new Blob(arrayProtocol, {type: "text/plain;charset=utf-8"});
  saveAs(blob, "hello world.txt");
};

// Cargar dinamicamente archivos JavaScript
var conf = new ConfigurationOfAnalyzer();
conf.loadListJSFile();
