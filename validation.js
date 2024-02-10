const jsonschema = require('jsonschema');
const fs = require('fs');
require('colors');

// -- Env Variable
if(!process.env.SCHEMA_FILE){
    console.error(`[ERR] You need to define SCHEMA_FILE environment variable`.red);
    process.exit(1);
}
if(!process.env.VALUES_FILE){
    console.error(`[ERR] You need to define VALUES_FILE_FILE environment variable`.red);
    process.exit(1);
}

// -- Load File
let valuesFile,values;
let schemaFile,schema;
try{
    valuesFile = fs.readFileSync(process.env.VALUES_FILE).toString();
}catch (e) {
    console.error(`[ERR] Can't read values file "${process.env.VALUES_FILE}" (${e.message}).`.red);
    process.exit(1);
}
try{
    values = JSON.parse(valuesFile);
}catch (e) {
    console.error(`[ERR] Can't parse file "${process.env.VALUES_FILE}" (${e.message}).`.red);
    process.exit(1);
}
try{
    schemaFile = fs.readFileSync(process.env.SCHEMA_FILE).toString();
}catch (e) {
    console.error(`[ERR] Can't read values file "${process.env.SCHEMA_FILE}" (${e.message}).`.red);
    process.exit(1);
}
try{
    schema = JSON.parse(schemaFile);
}catch (e) {
    console.error(`[ERR] Can't parse file "${process.env.SCHEMA_FILE}" (${e.message}).`.red);
    process.exit(1);
}
console.log(`Schema : \n`.blue, JSON.stringify(schema));
console.log(`Values : \n`.blue, JSON.stringify(values));
// -- Validation file
console.log(`Validation :`.blue);
const validation = jsonschema.validate(values, schema);
if(validation.errors.length === 0){
    fs.appendFileSync('/dev/termination-log','Schema Validate');
    console.log('✅  Schema Validate'.green);
    process.exit(0);
}
for (const error of validation.errors){
    fs.appendFileSync('/dev/termination-log',`ERR : ${error.stack} \n`);
    console.error(`⚠️ ${error.stack}`.red);
}
process.exit(1);
