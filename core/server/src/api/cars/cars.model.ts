import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const CarsSchema = new Schema({
  type: String,
  title: multilingualSchema,
  description: multilingualSchema,
  thumbnail: imageSchema,
  createdAt: Date,
  meta: metaTagsSchema,
  position: Number,
});

export default model('Cars', CarsSchema);
