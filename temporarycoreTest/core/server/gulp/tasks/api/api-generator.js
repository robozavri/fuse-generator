import _ from 'lodash';
import gulp from 'gulp';
import path from 'path';
import paths from '../../paths';
import { getDirFromArgv, firstUC, firstLC, plural, singular} from '../../helpers';
const $ = require('gulp-load-plugins')();

export default class ApiGenerator {

    constructor({fields, refFields, selectFields, module, configs}) {
           this.fields = fields;
           this.refFields = refFields;
           this.selectFields =selectFields;
           this.module = module;
           this.configs = configs;
           this.availableLangs = configs.langs;
    }

    startGenerate(){
        if (this.module.moduleType === 'articles') {
            this.generateApi();
            this.generateStub();   
        }
        
        if (this.module.moduleType === 'common') {
            this.generateApiCommon();
            this.generateCommonStub();
        }
    }

    // Generators
    generateApi() {
        const name = this.module.cmdTitle;
        const dir = getDirFromArgv();
        const src = paths.generatorTemplates.api.standart;
        const dest = path.join(paths.server.src, 'api' + (dir ? '/' + dir : ''), plural(name));
        return this.insertTemplates(name, src, dest);
    }

    generateStub() {
        const name = this.module.cmdTitle;
        const src = paths.generatorTemplates.stub;
        const dest = path.join(paths.server.src, 'stubs');
        return this.insertTemplates(name, src, dest);
    }

    generateApiCommon() {
        const name =  this.module.cmdTitle;
        const dir = getDirFromArgv();
        const src = paths.generatorTemplates.api.common;
        const dest = path.join(paths.server.src, 'api' + (dir ? '/' + dir : ''), plural(name));
        return this.insertCommonsTemplates(name, src, dest);
    }

    generateCommonStub() {
        const name = this.module.cmdTitle;
        const src = paths.generatorTemplates.stub;
        const dest = path.join(paths.server.src, 'stubs');
        return this.insertTemplates(name, src, dest);
    }

    insertCommonsTemplates(name, src, dest) { 
        const singleStub = this.generateSingleStub();
        
        return gulp.src(src)
            .pipe($.template({
            nameUC: firstUC(name),
            nameFUCCamel: firstUC(_.camelCase(name)),
            nameCamel: _.camelCase(name),
            nameLC: firstLC(name),
            namePlural: plural(name),
            namePluralLC: plural(name.toLowerCase()),
            namePluralFUC: firstUC(plural(name)),
            nameSingularLC: singular(name),
            nameSingularFUC: firstUC(singular(name)),
            schema: this.generateSchema(),
            keywords: this.generateKeywordSearch(),
            keybaseProps: this.generateBaseProps(),
            objectNames: singleStub.objectNames,
            stubObjectMethods: singleStub.stubObjectMethods,
            objectNamesWithI: singleStub.objectNamesWithI,
            defField: ''
            }, {
            interpolate: /<%=([\s\S]+?)%>/g
            }))
            .pipe($.rename(path => {
            path.basename =  this.getFileName(name, path.basename);
            }))
            .pipe(gulp.dest(dest));
    }

    insertTemplates(name, src, dest) { 
        const singleStub = this.generateSingleStub();
      
        return gulp.src(src)
          .pipe($.template({
            nameFUCCamel: firstUC(_.camelCase(name)),
            nameCamel: _.camelCase(name),
            nameUC: firstUC(name),
            nameLC: firstLC(name),
            namePlural: plural(name),
            namePluralLC: plural(name.toLowerCase()),
            namePluralFUC: firstUC(plural(name)),
            nameSingularLC: singular(name),
            nameSingularFUC: firstUC(singular(name)),
            schema: this.generateSchema(),
            keywords: this.generateKeywordSearch(),
            keybaseProps: this.generateBaseProps(),
            objectNames: singleStub.objectNames,
            stubObjectMethods: singleStub.stubObjectMethods,
            objectNamesWithI: singleStub.objectNamesWithI,
            defField: ''
          }, {
            interpolate: /<%=([\s\S]+?)%>/g
          }))
          .pipe($.rename(path => {
            path.basename = this.getFileName(name, path.basename);
          }))
          .pipe(gulp.dest(dest));
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

    // Hepler generators Generators
    generateSchema() {
        let template = '';
    
        for (let key in this.fields) {
            if (typeof this.fields[key] === 'object') {
              template += this.buildFieldObject(key, this.fields[key]);
            } else {
              template += this.detectFieldType(key, this.fields[key]);
            }
        }
      return template;
    }
    
    generateMetaObj(key) {
        return  `{
            title : {
               ${this.buildMultilingualelement(key)}
            },
            description : {
               ${this.buildMultilingualelement(key)}
            },
            keywords: ['${key} meta keyword1', '${key} meta keyword2', '${key} meta keyword3'],
            image: { url: generateImage() },
        }`;
    }
      
    generateSelect(key) {
        if( this.selectFields[key].selectType === 'multiple' ) {
            let template = '';
            this.selectFields[key].values.map( (value) => {
                template += `'${value}',`;
            });
            return `[${template}]`;
        }
        const randomValue = this.selectFields[key].values[Math.floor(Math.random() * this.selectFields[key].values.length)];
        return `'${randomValue}'`;
    }
    
    generateKeywordSearch() {
        let template = '';
        Object.keys(this.fields).map((key, index) => {
            switch( this.fields[key] ) {
                case 'multilingualSchema':  template += this.buildKeyword(key, 'multilingualSchema');
                   break;
                case 'String': template += this.buildKeyword(key, 'String');
                   break;
            }
        });
        return template;
    }
    
    generateBaseProps() {
        let template = '';
    
        Object.keys(this.fields).map((key, index) => {
            template += `
        '${key}',`;
        });
        
        return template;
    }
    
    generateKeywordSearch() {
        let template = '';
        Object.keys(this.fields).map((key, index) => {
            switch( this.fields[key] ) {
                case 'multilingualSchema':  template += this.buildKeyword(key, 'multilingualSchema');
                   break;
                case 'String': template += this.buildKeyword(key, 'String');
                   break;
            }
        });
        return template;
    }
    
    generateBaseProps() {
        let template = '';
    
        Object.keys(this.fields).map((key, index) => {
            template += `
        '${key}',`;
        });
        
        return template;
    }

    generateSingleStub() {
        let objectNames = '';
        let objectNamesWithI = '';
        let stubObjectMethods = '';
    
        Object.keys(this.fields).map((key, index) => {
          if (index == 0) {
            objectNames +=
              `  ${key}: get${_.upperFirst(_.camelCase(key))}Object(),`;
       objectNamesWithI +=
              `${key}: get${_.upperFirst(_.camelCase(key))}Object(i),`;
                stubObjectMethods += this.buildSingleStubObject(key, this.fields[key]);
          } else {
              objectNames += `
        ${key}: get${_.upperFirst(_.camelCase(key))}Object(),`;
            objectNamesWithI += `
        ${key}: get${_.upperFirst(_.camelCase(key))}Object(i),`;
                stubObjectMethods += this.buildSingleStubObject(key, this.fields[key]);
          }
        });
        
        return {
            objectNames: objectNames,
            objectNamesWithI: objectNamesWithI, 
            stubObjectMethods: stubObjectMethods
        };
    }

    // Builders
    detectFieldType(key, type){
        switch( type ) {
          case 'multilingualSchema-Textarea':  return this.build(key, 'multilingualSchema');
          break;
        case 'multilingualSchema-quill-editor':  return this.build(key, 'multilingualSchema');
          break;
        case 'multilingualSchema':  return this.build(key, 'multilingualSchema');
          break;
        case 'quill-editor': return this.build(key, 'String');
          break;
        case 'Textarea': return this.build(key, 'String');
          break;
        case 'String': return this.build(key, 'String');
          break;
        case 'Number': return this.build(key, 'Number');
          break;
        case 'imageSchema': return this.build(key, 'imageSchema');
          break;
        case 'Date': return this.build(key, 'Date');
          break;
        case '[imageSchema]': return this.build(key, '[imageSchema]');
          break;
        case 'Socials': return this.build(key, '[{ account: String, link: String }]');
          break;
        case 'Reference': return this.build(key, this.buildReference(key));
          break;
        case 'Select': return this.build(key, this.buildSelect(key));
          break;
        case 'Slide-toggle': return this.build(key, 'Boolean');
          break;
        case 'Meta': return this.build(key, 'metaTagsSchema');
          break;
      }
    }
    
    getSchemaType(key, type){
          switch( type ) {
            case 'multilingualSchema-Textarea':  return 'multilingualSchema';
            break;
          case 'multilingualSchema-quill-editor':  return 'multilingualSchema';
            break;
          case 'multilingualSchema':  return 'multilingualSchema';
            break;
          case 'quill-editor': return 'String';
            break;
          case 'Textarea': return 'String';
            break;
          case 'String': return 'String';
            break;
          case 'Number': return 'Number';
            break;
          case 'imageSchema': return 'imageSchema';
            break;
          case 'Date': return 'Date';
            break;
          case '[imageSchema]': return '[imageSchema]';
            break;
          case 'Socials': return '[{ account: String, link: String }]';
            break;
          case 'Reference': return this.buildReference(key);
            break;
          case 'Select': return this.buildSelect(key);
            break;
          case 'Slide-toggle': return'Boolean';
            break;
          case 'Meta': return 'metaTagsSchema';
            break;
        }
    }
    
    buildFieldObject(key, obj) {
        let buildedObj = `${key}: `;
        buildedObj += this.nestedBuilder(key, obj);
        return buildedObj;
    }
    
    nestedBuilder(key, obj) {
       let temp = ``
      if (typeof obj == "object") {
        temp +=  `{`;
          for (let property in obj) {
            temp += ` ${property}: `
            temp += this.nestedBuilder(property, obj[property]);
          }
        temp += `},`
      } else {
        temp += `${this.getSchemaType(key, obj)},`;
      }
      return temp;
    }
    
    nestedStubBuilder(key, obj) {
      let temp = ``
      if (typeof obj == "object") {
        temp +=  `{`;
          for (let property in obj) {
            temp += ` ${property}: `
            temp += this.nestedStubBuilder(property, obj[property]);
          }
        temp += `},`
      } else {
        temp += `${this.buildStubObj(key, obj)},`;
      }
      return temp;
    }
    
    buildStubObj(key, type) {
      let templateContent = '';
    
          switch( type ) {
            case 'multilingualSchema-Textarea':   
        templateContent += `{
            ${this.buildMultilingualelement(key)}
        }`;
              break;
            case 'multilingualSchema-quill-editor':   
        templateContent += `{
            ${this.buildMultilingualelement(key)}
        }`;
              break;
            case 'multilingualSchema':   
        templateContent += `{
            ${this.buildMultilingualelement(key)}
        }`;
              break;
            case 'quill-editor':  templateContent += `'${key}'`;
              break;
            case 'Textarea':  templateContent += `'${key}'`;
              break;
            case 'String':  templateContent += `'${key}'`;
              break;
    
            case 'Number':  templateContent += `_.random(1, 20)`;
              break;
    
            case 'imageSchema':  templateContent += `{ url: generateImage()}`;
              break;
    
            case 'Date': templateContent += `new Date()`;
              break;
            case 'Slide-toggle': templateContent += `false`;
              break;
            case 'Select': templateContent += this.generateSelect(key);
              break;
              case 'Reference': templateContent += `null`;
              break;
            case 'Meta': templateContent += this.generateMetaObj(key);
              break;
    
            case '[imageSchema]':  
        templateContent += `[
            { url:  generateImage()},
            { url:  generateImage()},
            { url:  generateImage()}
        ]`;
              break;
            case 'Socials': 
        templateContent += `[
              { account: generateSocials(), link: \`https://www.\${generateSocials()}.com/\` },
              { account: generateSocials(), link: \`https://www.\${generateSocials()}.com/\` },
              { account: generateSocials(), link: \`https://www.\${generateSocials()}.com/\` }
        ]`;
        }
        return templateContent;
    }
    
    buildSelect(key) {
      if ( this.selectFields[key].selectType === 'multiple' ) {
        return `[String]`;
      }
      return `String`;
    }
    
    buildReference(key) { 
      if ( this.refFields[key].referenceType === 'multiple' ) {
        return `[{ type: Schema.Types.ObjectId, ref: '${ this.refFields[key].reference}' }]`;
      }
      return`{ type: Schema.Types.ObjectId, ref: '${ this.refFields[key].reference}'}`;
    }

    build(key, value) {
        return `
      ${key}: ${value},`;
    }
    
    buildKeyword(key, value) {
        let template = '';
        if (value == 'String') {
            return `
            { '${key}': { $regex: keyword, $options: 'i' } },
            `;
        }
    
        if (value == 'multilingualSchema') {
           
            this.availableLangs.map( (lang) => {
    template += 
            `
            { '${key}.${lang}': { $regex: keyword, $options: 'i' } },
           `
            });
            return template;
        }
        
    }
    
    buildSingleStubObject(key, type) {
    
        let templateContent = '';
        let socialGenHelper;
        if (typeof type == "object") {
          let result = this.nestedStubBuilder(key, type);
          return `
    function get${_.upperFirst(_.camelCase(key))}Object(i: number = 0): any {
        return ${ result.substring(0, result.length - 1) };
    }`;
        }
        
    
        switch( type ) {
            case 'multilingualSchema-Textarea':   
    templateContent += `{
            ${this.buildMultilingualelement(key)}
        }`;
              break;
            case 'multilingualSchema-quill-editor':   
    templateContent += `{
            ${this.buildMultilingualelement(key)}
        }`;
              break;
            case 'multilingualSchema':   
    templateContent += `{
            ${this.buildMultilingualelement(key)}
        }`;
              break;
            case 'quill-editor':  templateContent += `'${key}'`;
              break;
            case 'Textarea':  templateContent += `'${key}'`;
              break;
            case 'String':  templateContent += `'${key}'`;
              break;
    
            case 'Number':  templateContent += `_.random(1, 20)`;
              break;
    
            case 'imageSchema':  templateContent += `{ url: generateImage()}`;
              break;
    
            case 'Date': templateContent += `new Date()`;
              break;
            case 'Slide-toggle': templateContent += `false`;
              break;
            case 'Select': templateContent += this.generateSelect(key);
              break;
            case 'Reference': templateContent += '';
              break;
            case 'Meta': templateContent += this.generateMetaObj(key);
              break;
    
            case '[imageSchema]':  
        templateContent += `[
            { url:  generateImage()},
            { url:  generateImage()},
            { url:  generateImage()}
        ]`;
              break;
            case 'Socials': 
        templateContent += `[
              { account: social, link: \`https://www.\${social}.com/\` },
              { account: social, link: \`https://www.\${social}.com/\` },
              { account: social, link: \`https://www.\${social}.com/\` }
        ]`;
          socialGenHelper = 'const social = generateSocials();';
              break;
        }
    
        if ( socialGenHelper !== undefined ) {
          return `
    function get${_.upperFirst(_.camelCase(key))}Object(i: number = 0): any {
        ${socialGenHelper}
        return ${templateContent};
    }`;
        } else {
          return `
    
    function get${_.upperFirst(_.camelCase(key))}Object(i: number = 0): any {
        return ${templateContent};
    }`;
        }
      
    }
    
    buildMultilingualelement(key) {
      let template = '';
      availableLangs.map( (lang) => {
        template += 
            `
            ${lang}: \`${key} ${lang} \${i}\`,`;
      });
      return template;
    }
}