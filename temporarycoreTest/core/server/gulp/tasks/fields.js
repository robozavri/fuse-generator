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
     // name: 'String',
     // fullName: 'String',
     // title: 'multilingualSchema', 
     // description: 'multilingualSchema', 
     // smallDescription: 'multilingualSchema-Textarea', 
     // content: 'multilingualSchema-quill-editor', 
     // aboutQuili: 'quill-editor',
     // aboutPrimitive: 'Textarea',
     // count: 'Number', 
     // thumbnail: 'imageSchema', 
     // image: 'imageSchema', 
     // fotos: '[imageSchema]' ,
     // images: '[imageSchema]' ,
     // createAt: 'Date',
     // socialAccounts: 'Socials',
     // category: 'Reference',
     // blogType: 'Select',
     // isFeatured: 'Slide-toggle',
     // meta: 'Meta',

     // about: {
     //      contact: {
     //           // category: 'Reference',
     //           street: {
     //                title:'String', 
     //                // blogType: 'Select',
     //                // category: 'Reference', 
     //                peoples: {
     //                     human: {
     //                          age : 'multilingualSchema',
     //                          age4 : 'String'
     //                     },
     //                     isFeatured: 'Slide-toggle',
     //                },
     //                desc: 'String', 
     //           },
     //           image: 'imageSchema', 
     //      },
     //      behemoth: {
     //           ambum: 'String',
     //           songs: {
     //                oneSong: 'multilingualSchema',
     //                oneSong2: 'multilingualSchema',
     //           },
     //           blackmetal: {
     //                images: '[imageSchema]', 
     //           }
     //      },
     //      socialAccounts: 'Socials',
     // }

     // about: {
     //      contact: {
     //           // street: {
     //           //      title:'multilingualSchema', 
     //           //      // description: 'multilingualSchema', 
     //           // },
     //           title: 'multilingualSchema', 
     //           address: 'multilingualSchema', 
     //           // images: '[imageSchema]', 
     //      },
     //      phone: 'String',
     //      socialAccounts: 'Socials',
     // }
     fullName: 'String',
     email: 'String',
     phoneNumber: 'String',
     subject: 'Reference',
     language: 'String',
     spots: 'String',
     price: 'String',
     additionalNote: 'String',
}