export function generateInterface(fields = false) {
  if (!fields) return emptyObj;
  
  let formTemplate = '';
  Object.keys(fields).map((key, index) => {
    formTemplate += addField(key);
  });
  return formTemplate;
}

function addField(key){
  return `\n\u0020\u0020${key}?: any;`;
}