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

export function generateArticlesList(fields){
    let data = [];

    for (let key in fields) {
        if (typeof fields[key] === 'object') {
          data.push(buildTree(key, fields[key]));
          // console.log('****************************' )
          // console.log('yes it is', fields[key] )
       }
      //  data.push(detectFieldType(key, fields[key]));
    }
    // data.push(buildListColumns());
    return data;
    /*
    Object.keys(fields).map((key, index) => {

        if (typeof fields[key] === 'object') {
           buildTree(key, fields[key]);
           console.log('yes it is', fields[key] )
        }
        return;
        switch( fields[key] ) {
            case 'multilingualSchema-quill-editor': data.push(multilingualQuillEditorBuilder(key));
            break;
            case 'multilingualSchema-Textarea': data.push(multilingualTextareaBuilder(key));
            break;
            case 'multilingualSchema': data.push(multilingualSchemaBuilder(key));
              break;
            case 'quill-editor': data.push(quillEditorBuilder(key));
              break;
            case 'Textarea': data.push(textareaBuilder(key));
              break;
            case 'String': data.push(stringBuilder(key));
              break;
            case 'Number': data.push(numberBuilder(key));
              break;
            case 'imageSchema': data.push(imageBuilder(key));
              break;
            case '[imageSchema]': data.push(imagesBuilder(key));
              break;
            case 'Date': data.push(dateBuilder(key));
              break;
            case 'Socials': data.push(socialsBuilder(key));
              break;
            case 'Select': data.push(selectBuilder(key));
              break;
            case 'Slide-toggle': data.push(slideToggleBuilder(key));
              break;
            case 'Reference': data.push(referenceBuilder(key));
              break;
            case 'Meta': data.push(metaBuilder(key));
              break;
        }
    });
    data.push(buildListColumns());
    return data;
    */
}

function buildTree(key, obj) {
   
  // let formGroupsArea = '';
  const areas = {
    // formComponentFormGroupArea: '',
    // formComponentHtmlArea: '',
    // formComponentClassOnInitBodyArea: '',
    // formComponentClassPropertiesArea: '',
    // formComponentImporArea: '',
    // formComponentClassPropertiesArea: '',
    // formComponentClassBodyArea: '',
  }

  const allObjs = [];
  // areas.formComponentFormGroupArea += nestedForGroupBuilder(key, obj);
  // areas.formComponentHtmlArea += nestedHtmlForGroupBuilder(key, obj);
  // fieldObg.emptyObjectsForOpenModal += (key, obj)
  // console.log(' areas :',   areas.formComponentFormGroupArea );

  const formComponentFormGroupArea = nestedForGroupBuilder(key, obj);
  const formComponentHtmlArea = nestedHtmlForGroupBuilder(key, obj);
  let restored = {};
  restored[key] = obj;
  const objectKeys = _.flattenDeep(getStringOutOfHierarchy(restored));

  _.forEach(objectKeys, function(keys) {
    const type = _.get(restored, keys);
    console.log('keys  :', keys);
    const objAreas =  detectFieldType(_.last(keys.split(".")), type, keys) ;
      // areas.formComponentClassOnInitBodyArea += objAreas.formComponentClassOnInitBodyArea;
      // areas.formComponentClassPropertiesArea += objAreas.formComponentClassPropertiesArea;
      // areas.formComponentImporArea += objAreas.formComponentImporArea;
      // areas.formComponentClassPropertiesArea += objAreas.formComponentClassPropertiesArea;
      // areas.formComponentClassBodyArea += objAreas.formComponentClassBodyArea;

      allObjs.push( objAreas );
      // allObjs.push( detectFieldType(_.last(keys.split(".")), type, keys) );
      // console.log('detectFieldType:', detectFieldType(_.last(keys.split(".")), type, keys));
      // console.log('detectFieldType:',objAreas);
  });

  const mergedAreas = mergeProperties(allObjs, [
    'formComponentFormGroupArea',
    'formComponentHtmlArea',
    'emptyObjectsForOpenModal',
  ]);

  mergedAreas.formComponentFormGroupArea = formComponentFormGroupArea;
  mergedAreas.formComponentHtmlArea = formComponentHtmlArea;
  // console.log('merged  :', mergedAreas);
  return mergedAreas;


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

  function nestedHtmlForGroupBuilder(key, obj) {
    let temp = '';
    if (typeof obj == "object") {
      temp +=  `   
      <div formGroupName='${key}'>
      `;
      for (let property in obj) {
        temp += nestedHtmlForGroupBuilder(property, obj[property]);
      }
      temp += `
      </div>`;
    } else {
      const { formComponentHtmlArea } = detectFieldType(key, obj);
      temp += formComponentHtmlArea;
    }
    return temp;
  }

  function nestedForGroupBuilder(key, obj) {
    let temp = '';
    if (typeof obj == "object") {
      temp +=  `
      ${key}: this.fb.group({
      `;
      for (let property in obj) {
        temp += nestedForGroupBuilder(property, obj[property]);
      }
      temp += ` 
      }),`;
    } else {
      const { formComponentFormGroupArea } = detectFieldType(key, obj);
      temp += formComponentFormGroupArea;
    }
    return temp;
  }
  return areas;
}

function detectFieldType(key, type, nested = null) {
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
    case 'Select': return selectBuilder(key);
      break;
    case 'Slide-toggle': return slideToggleBuilder(key);
      break;
    case 'Reference': return referenceBuilder(key, nested);
      break;
    case 'Meta': return metaBuilder(key, nested);
      break;
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
          // console.log('CHECK: ', area)
            if (_.has(obj, area) && !_.includes(excludes, area)) {
              // console.log('area: ', area)
              // console.log('obj[area]: ', obj[area])
              areasObj[area] += obj[area];
            }
        });
  });  
  return areasObj;
}