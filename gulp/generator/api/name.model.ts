import { Schema, model } from 'mongoose';

const <%=nameUC%>Schema = new Schema({
  <%=defField%>: String,
});

export default model('<%=nameUC%>', <%=nameUC%>Schema);