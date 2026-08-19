const crypto = require('crypto');
const { GLOSSARY_VERSION } = require('./synonymityRubric');

const CONFIGURATION_VERSION = 'poc-config-v1';
const PARSER_VERSION = process.env.POC_PARSER_VERSION || 'pdf-parse-v2';

function fingerprint({ algorithmVersion = 'baseline-poc', processingMode = 'fixture', language = 'en' } = {}) {
  const configuration = {
    configurationVersion: CONFIGURATION_VERSION,
    algorithmVersion,
    parserVersion: PARSER_VERSION,
    glossaryVersion: GLOSSARY_VERSION,
    processingMode,
    language,
  };
  const configurationHash = crypto.createHash('sha256').update(JSON.stringify(configuration)).digest('hex');
  return { ...configuration, configurationHash };
}

module.exports = { CONFIGURATION_VERSION, PARSER_VERSION, fingerprint };
