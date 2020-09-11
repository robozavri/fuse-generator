import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const BlogSchema = new Schema({
  
  name: String,
  fullName: String,
  images: [imageSchema],about: { contact: { street: { title: String, peoples: { human: { age: multilingualSchema, age4: String,}, isFeatured: Boolean,}, desc: String,}, image: imageSchema,}, behemoth: { ambum: String, songs: { oneSong: multilingualSchema, oneSong2: multilingualSchema,}, blackmetal: { images: [imageSchema],},}, socialAccounts: [{ account: String, link: String }],},
  position: Number,
});

export default model('Blog', BlogSchema);
