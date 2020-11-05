import { Schema, model } from 'mongoose';

const CategoriesSchema = new Schema({
  name: String,
  parent: {
    type: Schema.Types.ObjectId,
    // default: null,
    ref: 'Categories'
  },
  module: {
    type: Schema.Types.ObjectId,
    // default: null,
    ref: 'Modules'
  },
  fieldType: String,
  displayToList: Boolean,
  selectType: String,
  values: [String],
  reference: String,
  referenceType: String,
  value: String,
  displayFieldName: String,
});

export default model('Categories', CategoriesSchema);


