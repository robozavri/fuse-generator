import { Schema, model } from 'mongoose';


const ModulesSchema = new Schema({
  title: String,
  cmdTitle: String,
  moduleType: String,
  editPage: Boolean,
  position: Number,
});

export default model('Modules', ModulesSchema);
