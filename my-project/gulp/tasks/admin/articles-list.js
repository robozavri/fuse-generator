import { multilingualQuillEditor } from '../admin/fields-generators/multilingual-quill-editor';
import { multilingualTextarea } from '../admin/fields-generators/multilingual-textarea';

export function generateArticlesList(fields){
    let data = [];

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema-quill-editor': data.push(multilingualQuillEditor(key));
            break;
            case 'multilingualSchema-Textarea': data.push(multilingualTextarea(key));
    //         break;
    //         case 'multilingualSchema': template += `
    //   ${key}: {},`;
    //           break;
    //         case 'quill-editor':  template += `
    //   ${key}: '',`;
    //           break;
    //         case 'Textarea':  template += `
    //   ${key}: '',`;
    //           break;
    //         case 'String':  template += `
    //   ${key}: '',`;
    //           break;
    //         case 'Number': template += `
    //   ${key}: '',`;
    //           break;
    //         case 'imageSchema': template += `
    //   ${key}: {},`;
    //           break;
    //         case '[imageSchema]': template += `
    //   ${key}: [],`;
    //           break;
    //         case 'Date': template += `
    //   ${key}: new Date(),`;
    //           break;
    //         case 'Socials': template += `
    //   ${key}: [],`;
    //           break;
    //         case 'Reference':
    //                template += detectReference(key);
    //           break;
        }
    });
    return data;
}