import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const BlogSchema = new Schema({
  
  name: String,
  title: multilingualSchema,
  description: multilingualSchema,
  smallDescription: multilingualSchema,
  content: multilingualSchema,
  aboutQuili: String,
  aboutPrimitive: String,
  count: Number,
  thumbnail: imageSchema,
  images: [imageSchema],
  createAt: Date,
  socialAccounts: [{ account: String, link: String }],
  category: [{ type: Schema.Types.ObjectId, ref: 'blogCategory' }],
  blogType: [String],
  meta: metaTagsSchema,
  position: Number,
});

export default model('Blog', BlogSchema);
