'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import * as _ from 'lodash';
import axios from 'axios';
import { generateSchema, generateKeywordSearch, generateBaseProps, generateSingleStub } from './api/generator'
import { getModuleId,getDirFromArgv, firstUC, firstLC, plural, singular} from '../helpers';

const $ = require('gulp-load-plugins')();
var fields, refFields, listFields, langs, selectFields, editPage = false, module, configs , availableLangs;
export default {
    refFields,
    langs,
    selectFields,
    availableLangs
};



gulp.task('generate', (done) => {
  const moduleId = getModuleId();

  axios.post('http://localhost:4002/api/modules/fields', {
    _id: moduleId,
  })
  .then(function (response) {
    // console.log(response.data);
    editPage = response.data.module.editPage;
    listFields = response.data.listFields;
    refFields = response.data.refFields;
    selectFields = response.data.selectFields;
    fields = response.data.fields;
    module = response.data.module;
    configs = response.data.configs;
    availableLangs = response.data.configs.langs;

    // global.availableLangs = response.data.configs.langs;
    // global.langs = response.data.configs.langs;
    // global.refFields = response.data.refFields;
    // global.selectFields = response.data.selectFields;
    global.moduleData = {
        availableLangs: response.data.configs.langs,
        langs: response.data.configs.langs,
        refFields: response.data.refFields,
        selectFields: response.data.selectFields,
    };
    
    // console.log('**********:',{
    //     listFields,
    //     refFields,
    //     selectFields,
    //     fields,
    //     module,
    //     configs
    // });
    console.log('type:', response.data.module.moduleType)
    if (response.data.module.moduleType === 'articles') {
        runSequence('generateApi', 'generateStub', done);    
    }
    if (response.data.module.moduleType === 'common') {
        runSequence('generateApiCommon');
        // runSequence('generateApiCommon', 'generateCommonStub', done);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
});

// api
gulp.task('generateApi', () => {
    const name = module.cmdTitle;
    const dir = getDirFromArgv();
    const src = paths.generatorTemplates.api.standart;
    const dest = path.join(paths.server.src, 'api' + (dir ? '/' + dir : ''), plural(name));
    return insertTemplates(name, src, dest, true);
  });
  
gulp.task('generateStub', () => {
    const name = module.cmdTitle;
    const src = paths.generatorTemplates.stub;
    const dest = path.join(paths.server.src, 'stubs');
    return insertTemplates(name, src, dest, true);
  });
// end api


// common api
gulp.task('generateApiCommon', () => {
    const name = module.cmdTitle;
    const dir = getDirFromArgv();
    const src = paths.generatorTemplates.api.common;
    const dest = path.join(paths.server.src, 'api' + (dir ? '/' + dir : ''), plural(name));
    // console.log('we are here generateApiCommon dir', {
    //     name, src, dest,
    // });return;
    return insertCommonsTemplates(name, src, dest);
});
  
function insertCommonsTemplates(name, src, dest) { 
const singleStub = generateSingleStub(fields);
try {
    generateSchema(fields);
} catch (error) {
    console.log('error: ',error); 
}

// console.log('we are here fields', ); 
return;

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
    schema: generateSchema(fields),
    keywords: generateKeywordSearch(fields),
    keybaseProps: generateBaseProps(fields),
    objectNames: singleStub.objectNames,
    stubObjectMethods: singleStub.stubObjectMethods,
    objectNamesWithI: singleStub.objectNamesWithI,
    defField: ''
    }, {
    interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
    path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}
  
  gulp.task('generateCommonStub', () => {
    const name = module.cmdTitle;
    const src = paths.generatorTemplates.stub;
    const dest = path.join(paths.server.src, 'stubs');
    return insertTemplates(name, src, dest, true);
  });
// end common api

function insertTemplates(name, src, dest) { 
    const singleStub = generateSingleStub(fields);
  
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
        schema: generateSchema(fields),
        keywords: generateKeywordSearch(fields),
        keybaseProps: generateBaseProps(fields),
        objectNames: singleStub.objectNames,
        stubObjectMethods: singleStub.stubObjectMethods,
        objectNamesWithI: singleStub.objectNamesWithI,
        defField: ''
      }, {
        interpolate: /<%=([\s\S]+?)%>/g
      }))
      .pipe($.rename(path => {
        path.basename = getFileName(name, path.basename);
      }))
      .pipe(gulp.dest(dest));
}

function getFileName(name, basename) {
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
