'use strict';

import path from 'path';
import gulp from 'gulp';
import * as _ from 'lodash';
import axios from 'axios';
import AdminGenerator from './admin-generator';
import { getModuleId } from '../helpers';
const $ = require('gulp-load-plugins')();
import { firstUC, firstLC, plural, singular} from '../helpers';


gulp.task('generate', (done) => {
  const moduleId = getModuleId();
  console.log(' hello from gulp its works')

  axios.post('http://localhost:4002/api/modules/fields', {
    _id: moduleId,
  })
  .then(function (response) {
    const { data } = response;
   
    if (!data) {
      throw 'ERROR: Did not recived data from api';
    }
    const adminGenerator = new AdminGenerator(data);
    adminGenerator.startGenerate();
    // const { src, dest, generatedData, name } = adminGenerator.startGenerate();

    // return gulp.src(src)
    //     .pipe($.template(generatedData, {
    //         interpolate: /<%=([\s\S]+?)%>/g
    //     }))
    //     .pipe($.rename(path => {
    //         path.basename = getFileName(name, path.basename);
    //     }))
    //     .pipe(gulp.dest(dest));

  })
  .catch(function (error) {
    console.log(error);
  });
});

// function getFileName(name, basename) {
//   if (basename.includes('pluralFileName')) {
//     return basename.replace('pluralFileName', _.kebabCase(plural(name)));
//   } else if (basename.includes('singularFileName')) {
//     return basename.replace('singularFileName', _.kebabCase(singular(name)));
//   } else if (basename.includes('nameUC')) {
//     return basename.replace('nameUC', firstUC(name));
//   } else {
//     return basename.replace('name', name);
//   }
// }