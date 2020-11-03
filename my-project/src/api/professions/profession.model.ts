import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const ProfessionSchema = new Schema({
  
  title: String,
  fullname: String,
  description: String,
  comment: String,
  position: Number,
});

export default model('Profession', ProfessionSchema);
