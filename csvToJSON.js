const fs = require("fs");
const JsonStreamStringify = require('json-stream-stringify')

const sourceFile = "./d1.txt";
const targetFile = "data.json";
const seperator = ",";
const lineSeperator = "\n";

const csv = fs.readFileSync(sourceFile, { encoding: "utf8", flag: "r" });
var lines = csv.split(lineSeperator);
var result = [];
var headers = lines[0].split(seperator);
for (var i = 1; i < lines.length; i++) {
  var obj = {};
  var currentline = lines[i].split(seperator);
  for (var j = 0; j < headers.length; j++) {
    obj[headers[j]] = currentline[j];
  }
  result.push(obj);
}

const writeStream = fs.createWriteStream(targetFile, { flags: 'w' })
const jsonStream = new JsonStreamStringify(Promise.resolve(Promise.resolve(result)))
jsonStream.pipe(writeStream)
jsonStream.on('end', () => console.log('done '))

