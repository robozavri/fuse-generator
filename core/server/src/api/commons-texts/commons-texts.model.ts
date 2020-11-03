import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const CommonsTextsSchema = new Schema({
  
  name: String,
  fullName: String,
  category: [{ type: Schema.Types.ObjectId, ref: 'blogCategory' }],about: { contact: { title: multilingualSchema, address: multilingualSchema,}, phone: String, socialAccounts: [{ account: String, link: String }],},
});

export default model('CommonsTexts', CommonsTextsSchema);
