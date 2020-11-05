import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const ModulesSchema = new Schema({
  
  title: String,
  cmdTitle: String,
  editPage: Boolean,
  position: Number,
});

export default model('Modules', ModulesSchema);
