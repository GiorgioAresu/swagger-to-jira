const yaml = require('js-yaml');
const fs   = require('fs');
const env = require('env-var');

const swagger = env.get('SWAGGER_FILE', './swagger.yaml').asString();

function flattenDeep(arr1) {
  return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

const formatter = (route) => {
  const method = route.method.toUpperCase();
  const path = route.path.replace(/\{(\w*)\}/g, '*$1*');
  return `{{[ ] ${method} ${path}}} -- `;
};

const doc = yaml.safeLoad(fs.readFileSync(swagger, 'utf8'));
const groups = {};
Object.keys(doc.paths).forEach(path => 
  Object.keys(doc.paths[path]).forEach(method => {
    const obj = doc.paths[path][method];
    const res = {method, path, operationId: obj.operationId, summary: obj.summary};
    obj.tags.forEach(tag => groups[tag] ? groups[tag].push(res) : groups[tag] = [res]);
  })
);
const result = Object.keys(groups).map(group => [`h5. ${group}`, groups[group].map(formatter)]);
console.log(flattenDeep(result).join('\n'));