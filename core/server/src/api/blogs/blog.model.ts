import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const BlogSchema = new Schema({
  
  name: String,about: { contact: { street: { title: String, blogType: String, peoples: { human: { age: multilingualSchema, age4: multilingualSchema,}, anumal: { age2: multilingualSchema, age3: multilingualSchema,},},}, images: [imageSchema],}, socialAccounts: [{ account: String, link: String }],},
  position: Number,
});

export default model('Blog', BlogSchema);
