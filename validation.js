const jsonschema = require('jsonschema');
const fs = require("fs");
require('colors');

// -- Tools
const _tryCatch = (fnc, message) => {
    try {
        fnc();
    } catch (e) {
        console.error(message.replace('%E', e.message));
        process.exit(1);
    }
}

// -- Env Variable
if (!process.env.SCHEMA_FILE) {
    console.error(`[ERR] You need to define SCHEMA_FILE environment variable`.red);
    process.exit(1);
}
if (!process.env.VALUES_FILE) {
    console.error(`[ERR] You need to define VALUES_FILE_FILE environment variable`.red);
    process.exit(1);
}

// -- Load Files
let valuesFile, schemaFile;
_tryCatch(() => valuesFile = fs.readFileSync(process.env.VALUES_FILE).toString(),
    `[ERR] Can't read values file "${process.env.VALUES_FILE}" (%E).`.red);
_tryCatch(() => schemaFile = fs.readFileSync(process.env.SCHEMA_FILE).toString(),
    `[ERR] Can't read values file "${process.env.SCHEMA_FILE}" (%E).`.red);

// -- Parse Files
let values, schema;
_tryCatch(() => values = JSON.parse(valuesFile),
    `[ERR] Can't parse file "${process.env.VALUES_FILE}" (%E).`.red);
_tryCatch(() => schema = JSON.parse(schemaFile),
    `[ERR] Can't parse file "${process.env.SCHEMA_FILE}" (%E).`.red);
console.log(`Schema : \n`.blue, JSON.stringify(schema));
console.log(`Values : \n`.blue, JSON.stringify(values));

// -- Validation file
console.log(`Validation :`.blue);
const validation = jsonschema.validate(values, schema);
if (validation.errors.length === 0) {
    fs.appendFileSync('/dev/termination-log', 'Schema Validate');
    console.log('✅  Schema Validate'.green);
    process.exit(0);
}
for (const error of validation.errors) {
    fs.appendFileSync('/dev/termination-log', `ERR : ${error.stack} \n`);
    console.error(`⚠️ ${error.stack}`.red);
}

process.exit(1);
