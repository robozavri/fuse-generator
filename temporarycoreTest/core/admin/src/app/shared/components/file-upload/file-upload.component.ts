import { Component, Output, EventEmitter, Input } from '@angular/core';
import { v4 } from 'uuid';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() accept: string;
  @Input() multiple: string;
  @Input() base64 = false;

  @Output() fileChange = new EventEmitter<any>();

  constructor() {}

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      for (let file of event.target.files) {
        const ext = file.name.substr(file.name.indexOf('.') + 1);
        const modifiedFile = new File([file], `${generateName()}.${ext}`, { type: file.type });
  
        if (this.base64) {
          getBase64(file, (base64) => {
            this.fileChange.emit({ file: modifiedFile, base64 });
          });
        } else {
          this.fileChange.emit({ file: modifiedFile });
        }
      }
    }
  }
}

function generateName() {
  return v4().replace('-', '').substr(0, 12);
}

function getBase64(file, cb) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    cb(reader.result);
  };
  reader.onerror = (error) => {
    console.error(error);
  };
}
