import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const <%=nameFUCCamel%>Schema = new Schema({
  adminEmail: String,
  <%=schema%>
});

export default model('<%=nameFUCCamel%>', <%=nameFUCCamel%>Schema);
