import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const CompiutersSchema = new Schema({
  comment: String,
  title: multilingualSchema,
  description: multilingualSchema,
  thumbnail: imageSchema,
  createdAt: Date,
  meta: metaTagsSchema,
  position: Number,
});

export default model('Compiuters', CompiutersSchema);
