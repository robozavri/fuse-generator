import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const <%=nameUC%>Schema = new Schema({
  <%=defField%>: String,
  title: multilingualSchema,
  description: multilingualSchema,
  thumbnail: imageSchema,
  createdAt: Date,
  meta: metaTagsSchema,
  position: Number,
});

export default model('<%=nameUC%>', <%=nameUC%>Schema);
