import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const NewsSchema = new Schema({
  title: multilingualSchema,
  description: multilingualSchema,
  thumbnail: imageSchema,
  content: multilingualSchema,
  createdAt: Date,
  isFeatured: Boolean,
  meta: metaTagsSchema,
  position: Number,
});

export default model('News', NewsSchema);
