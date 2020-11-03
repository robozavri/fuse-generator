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
export const availableLangs = ['en', 'ge' ];
// list display fields
// only String or multilingualSchema
export const listFields = {
     title: 'String',
     // title: 'multilingualSchema', 
};

export const refFields = {
     subject: {
          //  reference must be camelCase
          reference: 'Subject',
          //  single/multiple
          referenceType: 'single',
          value: '_id',
          displayFieldName: 'title?.ge',
     }
}

export const selectFields = {
     blogType: {
          //  single/multiple
          selectType: 'single',
          values: ['metal', 'rock', 'classic', 'black']
     }
}

export const fields = {
     title: 'String',
     fullname: 'String',
     description: 'String',
     comment: 'String',
}