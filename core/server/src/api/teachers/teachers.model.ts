import { Schema, model } from 'mongoose';

const TeachersSchema = new Schema({
  title: String,
});

export default model('Teachers', TeachersSchema);