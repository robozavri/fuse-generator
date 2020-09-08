import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const CommonSchema = new Schema({
  
  name: String,about: { contact: { street: { title: String, peoples: { human: { age: multilingualSchema, age4: String,}, isFeatured: Boolean,}, desc: String,}, image: imageSchema,}, behemoth: { ambum: String, songs: { oneSong: multilingualSchema, oneSong2: multilingualSchema,}, blackmetal: { images: [imageSchema],},}, socialAccounts: [{ account: String, link: String }],},
});

export default model('Common', CommonSchema);
