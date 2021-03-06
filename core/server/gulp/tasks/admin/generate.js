import * as _ from 'lodash';
import { multilingualQuillEditorBuilder } from '../admin/fields-generators/multilingual-quill-editor';
import { multilingualTextareaBuilder } from '../admin/fields-generators/multilingual-textarea';
import { multilingualSchemaBuilder } from '../admin/fields-generators/multilingual-schema';
import { quillEditorBuilder } from '../admin/fields-generators/quill-editor';
import { textareaBuilder } from '../admin/fields-generators/textarea';
import { stringBuilder } from '../admin/fields-generators/string';
import { numberBuilder } from '../admin/fields-generators/number';
import { imageBuilder } from '../admin/fields-generators/image';
import { imagesBuilder } from '../admin/fields-generators/images';
import { dateBuilder } from '../admin/fields-generators/date';
import { socialsBuilder } from '../admin/fields-generators/socials';
import { selectBuilder } from '../admin/fields-generators/select';
import { slideToggleBuilder } from '../admin/fields-generators/slide-toggle';
import { referenceBuilder } from '../admin/fields-generators/reference';
import { buildListColumns } from '../admin/fields-generators/list';
import { metaBuilder } from '../admin/fields-generators/meta';
const $ = require('gulp-load-plugins')();
const log = $.util.log;
const colors = $.util.colors;

export function generate(fields){
    let data = [];

    for (let key in fields) {
        if (typeof fields[key] === 'object') {
          data.push(buildTree(key, fields[key]));
       } else {  
          data.push(detectFieldType(key, fields[key], null));
       }
    }
    data.push(buildListColumns());
    return data;
}

let nestedArr = [];
let hierarchy = '';
function buildTree(key, obj) {

  const allObjs = [];
  // old methods. need to remove in future
  // const formComponentFormGroupArea = nestedForGroupBuilder(key, obj);
  // const formComponentHtmlArea = nestedHtmlForGroupBuilder(key, obj);
  // const emptyObjectsForOpenModal = nestedemptyObjectsForOpenModal(key, obj);

const { 
   formComponentFormGroupArea,
   formComponentHtmlArea,
   emptyObjectsForOpenModal} = nestedHierarchyBuilder(key, obj);

  checkNestedEmptyObjs(key, obj);
  let formComponentClassOnInitBodyArea = '';

  _.forEach(nestedArr, function(keys) {
    let name = keys.substring(0, keys.length - 1);
    formComponentClassOnInitBodyArea += `
    this.formData.${name} = this.formData.${name} || {};`;
  });

  let restored = {};
  restored[key] = obj;

function nestedHierarchyBuilder(key, obj, parent = null) {
  let tempGroup = '';
  let tempHtml = '';
  let tempEmptyObj = '';

  if (parent !== null) {
      hierarchy = hierarchy.substring(0, hierarchy.indexOf(parent) + parent.length + 1);
  }

  if (typeof obj == "object") { 
    hierarchy += `${key}.`;
    tempEmptyObj +=  `
    ${key}: {
    `;
    tempHtml +=  `   
    <div formGroupName='${key}'>
    `;
    tempGroup +=  `
    ${key}: this.fb.group({
    `;
    for (let property in obj) {
      const fieldObj = nestedHierarchyBuilder(property, obj[property], key);
      if (typeof fieldObj === "object" && _.has(fieldObj,'formComponentFormGroupArea') ) {
        const { formComponentFormGroupArea, formComponentHtmlArea, emptyObjectsForOpenModal } = fieldObj;
        tempGroup += formComponentFormGroupArea;
        tempHtml += formComponentHtmlArea;
        tempEmptyObj += emptyObjectsForOpenModal;
      }
    }
    tempGroup += `
    }),`;
    tempHtml += `
    </div>`;
    tempEmptyObj += ` 
  },`;
  } else {
    const fieldObj = detectFieldType(key, obj, hierarchy);
    allObjs.push( fieldObj );
    return fieldObj;
  }
  return {
    formComponentFormGroupArea : tempGroup,
    formComponentHtmlArea : tempHtml,
    emptyObjectsForOpenModal : tempEmptyObj,
  };
}

  // old code. need to remove in future
  // const objectKeys = _.flattenDeep(getStringOutOfHierarchy(restored));
  // _.forEach(objectKeys, function(keys) {
  //   const type = _.get(restored, keys);  
  //   let property = _.last(keys.split("."));
  //   let preparedKeys =  keys.substring(0, keys.indexOf(property));
  //   const objAreas =  detectFieldType(_.last(keys.split(".")), type, preparedKeys) ;
  //   allObjs.push( objAreas );
  // });

  const mergedAreas = mergeProperties(allObjs, [
    'formComponentFormGroupArea',
    'formComponentHtmlArea',
    'emptyObjectsForOpenModal',
  ]);
  mergedAreas.formComponentFormGroupArea = formComponentFormGroupArea;
  mergedAreas.formComponentHtmlArea = formComponentHtmlArea;
  mergedAreas.emptyObjectsForOpenModal = emptyObjectsForOpenModal;
  mergedAreas.formComponentClassOnInitBodyArea = formComponentClassOnInitBodyArea += mergedAreas.formComponentClassOnInitBodyArea;

  return mergedAreas;
}

let nestedCheck = '';
function checkNestedEmptyObjs(key, obj, parent = null) {
  if (parent !== null) {
    nestedCheck = nestedCheck.substring(0, nestedCheck.indexOf(parent) + parent.length + 1);
  }
  if (typeof obj == "object") {
    nestedCheck += `${key}.`;
    nestedArr.push(nestedCheck);
    for (let property in obj) {
      checkNestedEmptyObjs(property, obj[property], key);
    }
  } 
}

// old code. need to remove in future
/*
function getStringOutOfHierarchy(obj){
  let finalString = [];
  let lastString = [];
  let stringHierarachy = recHierarchy(obj, Object.keys(obj))[0];

  finalString.map(elem => {
    if(elem.constructor === Array){
      elem.forEach(
        (subelem => {
          lastString.push(subelem);
        })
      );
    }
  });
  return lastString;

  function recHierarchy(obj, initial) {
    if(Object.keys(obj).length != 0){
      return Object.keys(obj).map((elem) => {
        let basString = elem;
        switch (typeof obj[elem]) {
        case 'string':{
          return [`${elem.toString()}`];
        }
        default :{
          return [`${elem.toString()}`];
        }
        case 'object':{
          if(obj[elem].constructor === Array ) {
            return  [`${elem.toString()}`];
          }
          let returnedValue = recHierarchy(obj[elem]);
          
          let recurMap = (mapElem) => {
              if(mapElem.constructor === Array) {
                  return mapElem.map(
                      (mapsubelem) => { 
                        if(mapsubelem.constructor === Array) { 
                          return recurMap(mapsubelem);
                        } 
                        return `${basString}.${mapsubelem.toString()}`;
                      }
                  );
              }
              return `${basString}.${mapElem.toString()}`;
          }

          let value = returnedValue.map(
            (elem) => {
              if(elem.constructor === Array) {
                return elem.map(
                  (subelem) => {
                    if(elem.constructor === Array) {
                      return recurMap(subelem);
                   }
                    return `${basString}.${subelem.toString()}`;
                  }
                );
              }  
              return `${basString}.${elem.toString()}`;
            }
          ); 
          (initial && initial.indexOf(elem) !== -1) ? finalString = finalString.concat(value) : null;
          return value;
        }

        }
      });
    }else{
      return [''];
    }

  }
}

let nestedHtml = '';
function nestedHtmlForGroupBuilder(key, obj, parent = null) {
  let temp = '';
  if (parent !== null) {
     nestedHtml = nestedHtml.substring(0, nestedHtml.indexOf(parent) + parent.length + 1);
  }

  if (typeof obj == "object") {
    nestedHtml += `${key}.`;
    temp +=  `   
    <div formGroupName='${key}'>
    `;
    for (let property in obj) {
      temp += nestedHtmlForGroupBuilder(property, obj[property], key);
    }
    temp += `
    </div>`;
  } else {
    const { formComponentHtmlArea } = detectFieldType(key, obj, nestedHtml);
    temp += formComponentHtmlArea;
  }
  return temp;
}

let nested = '';
function nestedForGroupBuilder(key, obj, parent = null) {
  let temp = '';

  if (parent !== null) {
      nested = nested.substring(0, nested.indexOf(parent) + parent.length + 1);
  }

  if (typeof obj == "object") { 
    nested += `${key}.`;
    temp +=  `
    ${key}: this.fb.group({
    `;
    for (let property in obj) {
      temp += nestedForGroupBuilder(property, obj[property], key);
    }
    temp += ` 
    }),`;
  } else {
    const { formComponentFormGroupArea } = detectFieldType(key, obj, nested);
    temp += formComponentFormGroupArea;  
  }
  return temp;
}

let nestedForModal = '';
function nestedemptyObjectsForOpenModal(key, obj, parent = null) {
  let temp = '';

  if (parent !== null) {
    nestedForModal = nestedForModal.substring(0, nestedForModal.indexOf(parent) + parent.length + 1);
  }

  if (typeof obj == "object") { 
    nestedForModal += `${key}.`;
    temp +=  `
    ${key}: {
    `;
    for (let property in obj) {
      temp += nestedemptyObjectsForOpenModal(property, obj[property], key);
    }
    temp += ` 
    },`;
  } else {
    const { emptyObjectsForOpenModal } = detectFieldType(key, obj, nestedForModal);
    temp += emptyObjectsForOpenModal;  
  }
  return temp;
}
*/



// let hierarchy = '';
// function nestedHierarchyBuilder(key, obj, parent = null) {
//   let tempGroup = '';
//   let tempHtml = '';
//   let tempEmptyObj = '';

//   if (parent !== null) {
//       hierarchy = hierarchy.substring(0, hierarchy.indexOf(parent) + parent.length + 1);
//   }

//   if (typeof obj == "object") { 
//     hierarchy += `${key}.`;
//     tempEmptyObj +=  `
//     ${key}: {
//     `;
//     tempHtml +=  `   
//     <div formGroupName='${key}'>
//     `;
//     tempGroup +=  `
//     ${key}: this.fb.group({
//     `;
//     for (let property in obj) {
//       const fieldObj = nestedHierarchyBuilder(property, obj[property], key);
//       if (typeof fieldObj === "object" && _.has(fieldObj,'formComponentFormGroupArea') ) {
//         const { formComponentFormGroupArea, formComponentHtmlArea, emptyObjectsForOpenModal } = fieldObj;
//         tempGroup += formComponentFormGroupArea;
//         tempHtml += formComponentHtmlArea;
//         tempEmptyObj += emptyObjectsForOpenModal;
//       }
//     }
//     tempGroup += `
//     }),`;
//     tempHtml += `
//     </div>`;
//     tempEmptyObj += ` 
//   },`;
//   } else {
//     const fieldObj = detectFieldType(key, obj, hierarchy);
//     return fieldObj;
//   }
//   return {
//     formComponentFormGroupArea : tempGroup,
//     formComponentHtmlArea : tempHtml,
//     emptyObjectsForOpenModal : tempEmptyObj,
//   };
// }

function detectFieldType(key, type, nested = null) {
  try { 
      switch( type ) { 
        case 'multilingualSchema-quill-editor': return multilingualQuillEditorBuilder(key, nested);
        break;
        case 'multilingualSchema-Textarea': return multilingualTextareaBuilder(key, nested);
        break;
        case 'multilingualSchema': return multilingualSchemaBuilder(key, nested);
          break;
        case 'quill-editor': return quillEditorBuilder(key, nested);
          break;
        case 'Textarea': return textareaBuilder(key, nested);
          break;
        case 'String': return stringBuilder(key, nested);
          break;
        case 'Number': return numberBuilder(key, nested);
          break;
        case 'imageSchema': return imageBuilder(key, nested);
          break;
        case '[imageSchema]': return imagesBuilder(key, nested);
          break;
        case 'Date': return dateBuilder(key, nested);
          break;
        case 'Socials': return socialsBuilder(key, nested);
          break;
        case 'Select': return selectBuilder(key, nested);
          break;
        case 'Slide-toggle': return slideToggleBuilder(key, nested);
          break;
        case 'Reference': return referenceBuilder(key, nested);
          break;
        case 'Meta': return metaBuilder(key, nested);
          break;
        break;
      }
  } catch (err) {
      log(colors.red(`FIELD TYPE ERROR, check field: ${key}`));
      process.exit(1);
  }
 
}

function mergeProperties(data, excludes) {

  const areas = [
    'formComponentImporArea',
    'formComponentClassInputArea',
    'formComponentClassPropertiesArea',
    'formComponentClassConstructorArgumentsArea',
    'formComponentClassOnInitBodyArea',

    'formComponentFormGroupArea',

    'formComponentClassBodyArea',
    'formComponentHtmlArea',

    'emptyObjectsForOpenModal',
    'modalImportsArea',
    'modalComponentClassPropertiesArea',
    'modalComponentClassViewChildArea',
    'modalComponentClassConstructorArgumentsArea',
    'modalComponentClassOnInitBodyArea',
    'modalComponentClassNgAfterViewInitArrayArea',
    'modalComponentClassFormValuesMergeArea',
    'formComponentBindParams',
    'modalHtmlTabArea',

    'listImportsArea',
    'listComponentClassPropertiesArea',
    'listComponentClassConstructorArgumentsArea',
    'listComponentClassOnInitBodyArea',
    'listHtmlColumnsArea',
    'listHtmlTabArea',

    'editPageComponentImportsArea',
    'editPageComponentClassPropertiesArea',
    'editPageComponentClassViewChildArea',
    'editPageComponentClassNgAfterViewInitArrayArea',
    'editPageComponentClassFormValuesMergeArea',
    'editPageComponentClassConstructorArgumentsArea',
    'editPageComponentClassOnInitBodyArea',
    'editPageComponentClassPageLoadDataMeta',
    'editPageHtmlTabArea',
  ];

  const areasObj = {};
  areas.map((area) => { areasObj[area] = ''});
 
  _.forEach(data, function (obj, key) {
        areas.map( (area) => {
            if (_.has(obj, area) && !_.includes(excludes, area)) {
              areasObj[area] += obj[area];
            }
        });
  });  
  return areasObj;
}