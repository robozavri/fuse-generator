import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const ProfessionsSchema = new Schema({
  
  fullName: String,
  email: String,
  phoneNumber: String,
  subject: { type: Schema.Types.ObjectId, ref: 'Subject'},
  language: String,
  spots: String,
  price: String,
  additionalNote: String,
  position: Number,
});

export default model('Professions', ProfessionsSchema);
