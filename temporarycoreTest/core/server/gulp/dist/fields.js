'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});
/* valid types */
/*  
 String 
 Number
 Date
 multilingualSchema
 imageSchema
 [imageSchema]
 Socials
 multilingualSchema-Textarea
 multilingualSchema-quill-editor
 quill-editor
 Textarea
 Slide-toggle
 Meta
*/
// notie objet key titles must be camelCase

// available langs
var availableLangs = exports.availableLangs = ['en', 'ge'];
// list display fields
// only String or multilingualSchema
var listFields = exports.listFields = {
     title: 'String'
     // title: 'multilingualSchema', 
};

var refFields = exports.refFields = {
     subject: {
          //  reference must be camelCase
          reference: 'Subject',
          //  single/multiple
          referenceType: 'single',
          value: '_id',
          displayFieldName: 'title?.ge'
     }
};

var selectFields = exports.selectFields = {
     blogType: {
          //  single/multiple
          selectType: 'single',
          values: ['metal', 'rock', 'classic', 'black']
     }
};

var fields = exports.fields = {
     title: 'String',
     fullname: 'String',
     description: 'String',
     comment: 'String'
};