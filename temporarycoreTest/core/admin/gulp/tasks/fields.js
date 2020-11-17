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

  Reference
  Select
*/
// note: object key titles must be camelCase

// available langs
export const availableLangs = ['en', 'ge' ];

// list display fields
// only String or multilingualSchema
export const listFields = {
  testString: 'String',
  // title: 'multilingualSchema', 
};

export const refFields = {
  testReference: {
    //  reference must be camelCase
    reference: 'blogCategory',
    //  single/multiple
    referenceType: 'multiple',
    value: '_id',
    displayFieldName: 'title?.ge',
  }
}

export const selectFields = {
  testSelect: {
    //  single/multiple
    selectType: 'single',
    values: ['metal', 'rock', 'classic', 'black']
  }
}

export const fields = {
  testString: 'String',
  testNumber: 'Number',
  testDate: 'Date',
  testMultilingual: 'multilingualSchema',
  testImage: 'imageSchema',
  testImages: '[imageSchema]',
  testSocials: 'Socials',
  testMultilingualTextarea: 'multilingualSchema-Textarea',
  testMultilingualEditor: 'multilingualSchema-quill-editor',
  testEditor: 'quill-editor',
  testTextarea: 'Textarea',
  testSlideToggle: 'Slide-toggle',
  meta: 'Meta',
  testReference: 'Reference',
  testSelect: 'Select',
  about: {
    phone: 'String',
    address: 'multilingualSchema',
  }
}