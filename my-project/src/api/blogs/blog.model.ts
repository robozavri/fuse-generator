import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const BlogSchema = new Schema({
  
  name: String,
  count: Number,
  thumbnail: imageSchema,
  images: [imageSchema],
  createAt: Date,
  meta: metaTagsSchema,
  position: Number,
});

export default model('Blog', BlogSchema);
