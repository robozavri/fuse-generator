import { MultilingualQuillEditorField } from './admin/fields-generators/multilingual-quill-editor';
import { MultilingualTextareaField } from './admin/fields-generators/multilingual-textarea';
import { MultilingualSchemaField } from './admin/fields-generators/multilingual-schema';
import { QuillEditorField } from './admin/fields-generators/quill-editor';
import { TextareaField } from './admin/fields-generators/textarea';
import { StringField } from './admin/fields-generators/string';
import { NumberField } from './admin/fields-generators/number';
import { ImageField } from './admin/fields-generators/image';
import { ImagesField } from './admin/fields-generators/images';
import { DateField } from './admin/fields-generators/date';
import { SocialsField } from './admin/fields-generators/socials';
import { SelectField } from './admin/fields-generators/select';
import { SlideToggleField } from './admin/fields-generators/slide-toggle';
import { ReferenceField } from './admin/fields-generators/reference';
import { List } from './admin/fields-generators/list';
import { MetaField } from './admin/fields-generators/meta';

import { FieldsHelper } from './admin/fields-helper';

import _ from 'lodash';
import gulp from 'gulp';
import path from 'path';
import paths from '../paths';
import { getDirFromArgv, firstUC, firstLC, plural, singular} from '../helpers';
const $ = require('gulp-load-plugins')();
const log = $.util.log;
const colors = $.util.colors;

export default class AdminGenerator {

    constructor({fields, refFields, selectFields, module, configs, listFields}) {
        this.fields = fields;
        this.refFields = refFields;
        this.selectFields = selectFields;
        this.module = module;
        this.configs = configs;
        this.listFields = listFields;
        this.availableLangs = configs.langs;
        this.allObjs = [];
        this.fieldsHelper = new FieldsHelper(configs.langs);
    }

    startGenerate(){
        if (this.module.moduleType === 'articles') { 
            this.generateArticleModule();
            this.generateArticleHttp();
            this.generateArticleModel();
        }
        
        if (this.module.moduleType === 'common') {
        }
    }

    generateArticleModule(){
      const name = this.module.cmdTitle;
      let src, dest = path.join(paths.admin.adminModules, _.kebabCase(plural(name)));
      
      if(this.module.editPage) {
         src = paths.adminGeneratorTemplates.articles;
      } else {
         src = paths.adminGeneratorTemplates.articlesWithModal;
      }

      let data = this.generateArticles();
      let generatedData = this.mergeAreaProperties(data, name);

      gulp.src(src)
        .pipe($.template(generatedData, {
            interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
            path.basename = this.getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
    }

    generateArticleModel(){
      const name = this.module.cmdTitle;
      const src = paths.adminGeneratorTemplates.model;
      const dest = paths.admin.model;
      const interfaceFields = this.generateInterface();

      return gulp.src(src)
        .pipe($.template({
          nameUC: firstUC(name),
          nameLC: firstLC(name),
          namePlural: _.camelCase(plural(name)),
          nameSingularUC: firstUC(_.camelCase(singular(name))),
          singularFileName: _.kebabCase(singular(name)),
          pluralFileName: _.kebabCase(plural(name)),
          interfaceFields: interfaceFields
        }, {
          interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
          path.basename = this.getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
    }

    generateArticleHttp(){
      const src = paths.adminGeneratorTemplates.http;
      const dest = paths.admin.http; 
      const name = this.module.cmdTitle;

      gulp.src(src)
        .pipe($.template({
          nameUC: firstUC(name),
          nameLC: firstLC(name),
          namePlural: _.camelCase(plural(name)),
          nameSingular: _.camelCase(singular(name)),
          nameSingularUC: firstUC(_.camelCase(singular(name))),
          singularFileName: _.kebabCase(singular(name)),
          pluralFileName: _.kebabCase(plural(name)),
        }, {
          interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
          path.basename = this.getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
    }

    generateArticles(){
        let data = [];
    
        for (let key in this.fields) {
            if (typeof this.fields[key] === 'object') {
              data.push(this.buildTree(key, this.fields[key]));
           } else {
              data.push(this.detectFieldType(key, this.fields[key], null));
           }
        }
        const list = new List({listFields: this.listFields, availableLangs: this.availableLangs})
        data.push(list.buildListColumns());
        return data;
    }

    buildTree(key, obj) {
        const { 
         formComponentFormGroupArea,
         formComponentHtmlArea,
         emptyObjectsForOpenModal
        } = this.nestedHierarchyBuilder(key, obj);
      
        this.checkNestedEmptyObjs(key, obj);
        let formComponentClassOnInitBodyArea = '';
      
        _.forEach(nestedArr, function(keys) {
          let name = keys.substring(0, keys.length - 1);
          formComponentClassOnInitBodyArea += `
          this.formData.${name} = this.formData.${name} || {};`;
        });
      
        let restored = {};
        restored[key] = obj;
      
        const mergedAreas = this.mergeProperties(this.allObjs, [
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

    nestedHierarchyBuilder(key, obj, parent = null) {
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
            const fieldObj = this.nestedHierarchyBuilder(property, obj[property], key);
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
          const fieldObj = this.detectFieldType(key, obj, hierarchy);
          this.allObjs.push( fieldObj );
          return fieldObj;
        }
        return {
          formComponentFormGroupArea : tempGroup,
          formComponentHtmlArea : tempHtml,
          emptyObjectsForOpenModal : tempEmptyObj,
        };
    }

    detectFieldType(key, type, nested = null) {
        try { 
            switch( type ) { 
              case 'multilingualSchema-quill-editor':
                const multilingualQuillEditorField = new MultilingualQuillEditorField(this.fieldsHelper, this.availableLangs);
                return multilingualQuillEditorField.Builder(key, nested);
              break;
              case 'multilingualSchema-Textarea':
                const multilingualTextareaField = new MultilingualTextareaField(this.fieldsHelper, this.availableLangs);
                return multilingualTextareaField.builder(key, nested);
              break;
              case 'multilingualSchema': 
                const multilingualSchemaField = new MultilingualSchemaField(this.fieldsHelper, this.availableLangs);
                return multilingualSchemaField.builder(key, nested);
                break;
              case 'quill-editor': 
                const quillEditorField = new QuillEditorField(this.fieldsHelper);
                return quillEditorField.builder(key, nested);
                break;
              case 'Textarea': 
                const textareaField = new TextareaField(this.fieldsHelper);
                return textareaField.textareaBuilder(key, nested);
                break;
              case 'String':
                const stringField = new StringField(this.fieldsHelper);
                return stringField.stringBuilder(key, nested);
                break;
              case 'Number': 
                const numberField = new NumberField(this.fieldsHelper);
                return numberField.numberBuilder(key, nested);
                break;
              case 'imageSchema': 
                const imageField = new ImageField(this.fieldsHelper);
                return imageField.builder(key, nested);
                break;
              case '[imageSchema]': 
                const imagesField = new ImagesField(this.fieldsHelper);
                return imagesField.builder(key, nested);
                break;
              case 'Date': 
                const dateField = new DateField(this.fieldsHelper);
                return dateField.dateBuilder(key, nested);
                break;
              case 'Socials': 
                const socialsField = new SocialsField(this.fieldsHelper);
                return socialsField.builder(key, nested);
                break;
              case 'Select': 
                const selectField = new SelectField(this.fieldsHelper, this.selectFields);
                return selectField.builder(key, nested);
                break;
              case 'Slide-toggle': 
                const slideToggleField = new SlideToggleField(this.fieldsHelper);
                return slideToggleField.builder(key, nested);
                break;
              case 'Reference': 
                const referenceField = new ReferenceField(this.fieldsHelper, this.refFields);
                return referenceField.builder(key, nested);
                break;
              case 'Meta': 
              const metaField = new MetaField();
              return metaField.builder(key, nested);
                break;
              break;
            }
        } catch (err) {
          console.log(err);
            log(colors.red(`FIELD TYPE ERROR, check field: ${key}`));
            process.exit(1);
        }
    }

    generateInterface() {      
      let formTemplate = '';
      Object.keys(this.fields).map((key, index) => {
        formTemplate += this.addField(key);
      });
      return formTemplate;
    }
    
    addField(key){
      return `\n\u0020\u0020${key}?: any;`;
    }

    mergeProperties(data, excludes) {

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

    mergeAreaProperties(data, name) {
      const names = {
        nameSingularUC: firstUC(_.camelCase(singular(name))),
        namePluralLC: _.camelCase(plural(name.toLowerCase())),
        namePluralFUC: firstUC(_.camelCase(plural(name))),
        nameSingularLC: singular(_.camelCase(name)),
        nameSingularFUC: firstUC(_.camelCase(singular(name))),
        singularFileName: _.kebabCase(singular(name)),
        pluralFileName: _.kebabCase(plural(name)),
      };

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
                if (_.has(obj, area)) {
                  areasObj[area] += obj[area];
                }
            });
      });
      
      return _.merge(areasObj,names);
    }

    getFileName(name, basename) {
      if (basename.includes('pluralFileName')) {
        return basename.replace('pluralFileName', _.kebabCase(plural(name)));
      } else if (basename.includes('singularFileName')) {
        return basename.replace('singularFileName', _.kebabCase(singular(name)));
      } else if (basename.includes('nameUC')) {
        return basename.replace('nameUC', firstUC(name));
      } else {
        return basename.replace('name', name);
      }
    }
}


