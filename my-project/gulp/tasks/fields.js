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
     name: 'String',
     title: 'multilingualSchema', 
};

export const refFields = {
     category: {
          //  reference must be camelCase
          reference: 'blogCategory',
          //  single/multiple
          referenceType: 'multiple',
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
     name: 'String',
     title: 'multilingualSchema', 
     description: 'multilingualSchema', 
     smallDescription: 'multilingualSchema-Textarea', 
     content: 'multilingualSchema-quill-editor', 
     aboutQuili: 'quill-editor',
     aboutPrimitive: 'Textarea',
     count: 'Number', 
     thumbnail: 'imageSchema', 
     images: '[imageSchema]' ,
     createAt: 'Date',
     socialAccounts: 'Socials',
     category: 'Reference',
     blogType: 'Select',
     isFeatured: 'Slide-toggle',
     meta: 'Meta',
};