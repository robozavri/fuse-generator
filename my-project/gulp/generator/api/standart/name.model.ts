import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const <%=nameFUCCamel%>Schema = new Schema({
  <%=schema%>
  position: Number,
});

export default model('<%=nameFUCCamel%>', <%=nameFUCCamel%>Schema);
