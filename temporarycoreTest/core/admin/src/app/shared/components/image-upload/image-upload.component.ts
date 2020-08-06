import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileApiService } from '../../http/files-api.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  @Input() image: any;
  @Output() uploadComplete = new EventEmitter<any>();

  selectedImage: any;

  constructor(
    private fileApiService: FileApiService
  ) { }

  onImageSelected(selectedImage) {

    this.selectedImage = selectedImage;
    let filesToDestroy = [];
    let filesToCreate = [];
    filesToDestroy.push(this.image.url);
    filesToCreate.push(this.selectedImage.file);

    this.fileApiService.createFiles(filesToCreate, filesToDestroy)
      .subscribe(() => {
        this.uploadComplete.emit({ url: this.selectedImage.file.name })
      }, () => {
        this.uploadComplete.next({ url: this.selectedImage.file.name })
      });
  }

}
