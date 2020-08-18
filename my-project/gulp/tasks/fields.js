/* valid types */
/*  
 String 
 Number
 Date
 multilingualSchema
 imageSchema
 [imageSchema]
*/

// list display fields
// only String or multilingualSchema
export const listFields = {
     name: 'String',
     title: 'multilingualSchema', 
};

export const fields = {
     name: 'String',
     title: 'multilingualSchema', 
     description: 'multilingualSchema', 
     count: 'Number', 
     thumbnail: 'imageSchema', 
     images: '[imageSchema]' ,
     createAt: 'Date'
};