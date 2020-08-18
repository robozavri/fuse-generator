import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileApiService } from '../../http/files-api.service';

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.scss']
})
export class ImagesUploadComponent {

  @Input() image: any;
  @Input() images: any;
  @Output() uploadComplete = new EventEmitter<any>();
  @Output() removeImage = new EventEmitter<any>();

  selectedImage: any;
  public multiple = 'multiple';
  filesToDestroy = [];
  filesToCreate = [];

  createdFiles = [];

  constructor(
    private fileApiService: FileApiService
  ) {
      // this.images.map((img: any) => {
      //     this.filesToDestroy.push(img.url);
      // });
  }

    removeImageItem(index): void {
      this.removeImage.emit(index);
    }

  onImageSelected(selectedImage): void {

    this.selectedImage = selectedImage;
    // const filesToDestroy = [];
    const filesToCreate = [];
    // filesToDestroy.push(this.image.url);
    filesToCreate.push(selectedImage.file);
    // this.images.map((img: any) => {
    //     filesToDestroy.push(img.url);
    // });
    // this.filesToCreate.push(selectedImage.file);
    // this.images.map((img: any) => {
    //       this.filesToDestroy.push(img.url);
    //   });
      // console.log('filesToDestroy:', filesToDestroy);
    console.log('selectedImage:', selectedImage);
    // console.log('filesToCreate:', filesToCreate);
    // console.log('filesToCreate:', this.filesToCreate);

    this.fileApiService.createFiles(filesToCreate, []).subscribe((data) => {
        // this.createdFiles.push()
        console.log('fileApiService:', data);
        this.uploadComplete.emit({ url: selectedImage.file.name });
        // this.uploadComplete.emit({ url: this.selectedImage.file.name });
        }, () => {
        this.uploadComplete.next({ url: selectedImage.file.name });
        // this.uploadComplete.next({ url: this.selectedImage.file.name });
    });
      ////////////////////////////////////////////////////////////////////
   // console.log('this.selectedImage.file.name', this.selectedImage.file.name)
  //   this.fileApiService.createFiles(filesToCreate, filesToDestroy)
  //     .subscribe(() => {
  //       this.uploadComplete.emit({ url: this.selectedImage.file.name });
  //     }, () => {
  //       this.uploadComplete.next({ url: this.selectedImage.file.name });
  //     });
  }

}
