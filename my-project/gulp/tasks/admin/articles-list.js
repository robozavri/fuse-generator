import { multilingualQuillEditorBuilder } from '../admin/fields-generators/multilingual-quill-editor';
import { multilingualTextareaBuilder } from '../admin/fields-generators/multilingual-textarea';
import { multilingualSchemaBuilder } from '../admin/fields-generators/multilingual-schema';
import { quillEditorBuilder } from '../admin/fields-generators/quill-editor';
import { textareaBuilder } from '../admin/fields-generators/textarea';
import { stringBuilder } from '../admin/fields-generators/string';
import { numberBuilder } from '../admin/fields-generators/number';
import { imageBuilder } from '../admin/fields-generators/image';
import { imagesBuilder } from '../admin/fields-generators/images';
import { dateBuilder } from '../admin/fields-generators/date';
import { socialsBuilder } from '../admin/fields-generators/socials';
import { selectBuilder } from '../admin/fields-generators/select';
import { slideToggleBuilder } from '../admin/fields-generators/slide-toggle';
import { referenceBuilder } from '../admin/fields-generators/reference';

export function generateArticlesList(fields){
    let data = [];

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema-quill-editor': data.push(multilingualQuillEditorBuilder(key));
            break;
            case 'multilingualSchema-Textarea': data.push(multilingualTextareaBuilder(key));
            break;
            case 'multilingualSchema': data.push(multilingualSchemaBuilder(key));
              break;
            case 'quill-editor': data.push(quillEditorBuilder(key));
              break;
            case 'Textarea': data.push(textareaBuilder(key));
              break;
            case 'String': data.push(stringBuilder(key));
              break;
            case 'Number': data.push(numberBuilder(key));
              break;
            case 'imageSchema': data.push(imageBuilder(key));
              break;
            case '[imageSchema]': data.push(imagesBuilder(key));
              break;
            case 'Date': data.push(dateBuilder(key));
              break;
            case 'Socials': data.push(socialsBuilder(key));
              break;
            case 'Select': data.push(selectBuilder(key));
              break;
            case 'Slide-toggle': data.push(slideToggleBuilder(key));
              break;
            case 'Reference': data.push(referenceBuilder(key));
              break;
        }
    });
    return data;
}