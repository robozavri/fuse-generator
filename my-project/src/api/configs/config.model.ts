import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const ConfigSchema = new Schema({
  
  langs: [String],
  position: Number,
});

export default model('Config', ConfigSchema);
