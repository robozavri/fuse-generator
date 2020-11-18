import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { GameApiService } from '../../../../shared/http/game-api.service';
import { accounts } from 'app/shared/constants/socials';
import { largeSize } from 'app/shared/constants/image';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameComponent implements OnInit {
  form: FormGroup;
  formData: any = {};
  imageSize = largeSize;
  

    variantsSelectTypes = ['toyota', 'niva', 'vaz', 'jeep', 'wrangler', 'car', ];
    get accounts(): any { return accounts; }

    get socials(): FormArray {
        return this.form.get('SocialsType') as FormArray;
    }
    images834 = [];
    items834: FormArray;

    
    @Input() SubjectReferenseTypes: any;
    

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    public api: GameApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.api.getOne().subscribe((data: any) => {
      this.formData = data;
      this.loadData();
    });
  }

  
    // SocialsType methods
    createSocials(data: any): FormGroup {
      return this.fb.group({
        account: [ data.account || ''],
        link: [ data.link || ''],
      });
    }
    
    addSocials(details: string): void {
      const detailsForm = this.fb.group({
        account: [''],
        link: [''],
      });
      this[details].push(detailsForm);
    }

    deleteSocials(i: any): void{
      this.socials.removeAt(i);
    }
    // GalleryImagesType upload methods
    deleteImageGalleryImagesType834(index: any): void {
      this.images834.splice(index, 1);
      this.items834 = this.form.get('GalleryImagesType') as FormArray;
      this.items834.removeAt(index);
    }

    createItemGalleryImagesType834(url= ''): FormGroup {
      return this.fb.group({
          url: url,
      });
    }

    addItemGalleryImagesType834(url: any): void {
      this.items834 = this.form.get('GalleryImagesType') as FormArray;
      this.items834.push(this.createItemGalleryImagesType834(url));
      this.images834.push({ url: url });
    }

    onUploadCompleteGalleryImagesType834(data: any): void {
      this.addItemGalleryImagesType834(data.url);
    }
    onUploadCompleteAvatarImageType887(data: any): void {
      this.form.get('AvatarImageType').get('url').markAsTouched();
      this.form.get('AvatarImageType').get('url').setValue(data.url);
    }
  
  loadData(): any {
      this.formData.variantsSelectType = this.formData.variantsSelectType || [];
      this.formData.SubjectReferenseType = this.formData.SubjectReferenseType || '';
      this.formData.booleanSlideToggleType = this.formData.booleanSlideToggleType === undefined ? false : this.formData.booleanSlideToggleType;
      this.formData.justTextarea = this.formData.justTextarea || '';
      this.formData.AdditionalNoteQuiliEditor = this.formData.AdditionalNoteQuiliEditor || '';
      this.formData.contentQuiliMultilingual = this.formData.contentQuiliMultilingual || {};
      this.formData.DescriptionMultilingualTextarea = this.formData.DescriptionMultilingualTextarea || {};
      const socialObj = { account: '', link: ''};
      const socialArray = (this.formData.SocialsType || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
  
      this.images834 = this.formData.GalleryImagesType || [];
      this.formData.AvatarImageType = this.formData.AvatarImageType || {};
      this.formData.SomeNameMultilingualTypeField = this.formData.SomeNameMultilingualTypeField || {};
      this.formData.CreateDateType = this.formData.CreateDateType || '';
      this.formData.UsersCountNumberType = this.formData.UsersCountNumberType || '';
      this.formData.titleStringType = this.formData.titleStringType || '';
    this.form = this.fb.group({
      variantsSelectType: [this.formData.variantsSelectType || []],
        SubjectReferenseType: [this.formData.SubjectReferenseType || ''],
      booleanSlideToggleType: [this.formData.booleanSlideToggleType],
      justTextarea: [this.formData.justTextarea || ''],
      AdditionalNoteQuiliEditor: [this.formData.AdditionalNoteQuiliEditor || ''],
      contentQuiliMultilingual: this.fb.group({
          
        en: [this.formData.contentQuiliMultilingual.en || ''],
        ge: [this.formData.contentQuiliMultilingual.ge || ''],
        ru: [this.formData.contentQuiliMultilingual.ru || ''],
      }),
      DescriptionMultilingualTextarea: this.fb.group({
          
        en: [this.formData.DescriptionMultilingualTextarea.en || ''],
        ge: [this.formData.DescriptionMultilingualTextarea.ge || ''],
        ru: [this.formData.DescriptionMultilingualTextarea.ru || ''],
      }),
      SocialsType: this.fb.array(socialArray),
        GalleryImagesType: this.fb.array(this.formData.GalleryImagesType || []), 
      AvatarImageType: this.fb.group({
        url: [this.formData.AvatarImageType.url || '']
      }),
      SomeNameMultilingualTypeField: this.fb.group({
          
        en: [this.formData.SomeNameMultilingualTypeField.en || ''],
        ge: [this.formData.SomeNameMultilingualTypeField.ge || ''],
        ru: [this.formData.SomeNameMultilingualTypeField.ru || ''],
      }),
      CreateDateType: [this.formData.CreateDateType || new Date()],
    UsersCountNumberType: [this.formData.UsersCountNumberType || ''],
      titleStringType: [this.formData.titleStringType || ''],
    });
  }

  submit(): void {
    this.api.update({ ...this.form.value }).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }

}
