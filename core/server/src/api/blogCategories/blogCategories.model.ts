import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const BlogCategoriesSchema = new Schema({
  
  title: multilingualSchema,
  meta: metaTagsSchema,
  position: Number,
});

export default model('BlogCategories', BlogCategoriesSchema);
