const nconf = require("nconf");
const path = require('path');
const environment = process.env.NODE_ENV || "development";

const currentDir = __dirname; //consigue el directorio actual de la ejecucion del archivo

function configGet() {
  nconf.argv().env();
  nconf.file("config", path.join(currentDir, "config.json"));

  return nconf;
}



module.exports = new configGet();
