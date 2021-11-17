import jsonSchemaCompleteYaml from './complete/yaml';
import jsonSchemaCompleteJson from './complete/json';
import schemaLints from './lint/lints';

const jsonSchemaMeta = {
  lint: schemaLints,
  yaml: jsonSchemaCompleteYaml,
  json: jsonSchemaCompleteJson,
};

export default jsonSchemaMeta;
