import { Schema, model } from 'mongoose';

const ConfigSchema = new Schema({
  langs: [String],
});

export default model('Config', ConfigSchema);
