import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { Game } from 'app/shared/models/game';
import { largeSize } from 'app/shared/constants/image';
import { accounts } from 'app/shared/constants/socials';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {
    
    @Input() SubjectReferenseTypes: any;
    
  @Input() formData: Game;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Game>();

  form: FormGroup;
  imageSize = largeSize;
  

    variantsSelectTypes = ['toyota', 'niva', 'vaz', 'jeep', 'wrangler', 'car', ];
    get accounts(): any { return accounts; }

    get socials(): FormArray {
        return this.form.get('SocialsType') as FormArray;
    }
    images640 = [];
    items640: FormArray;

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  
      this.formData.variantsSelectType = this.formData.variantsSelectType || [];
      this.formData.SubjectReferenseType = this.formData.SubjectReferenseType || '';
      this.formData.booleanSlideToggleType = this.formData.booleanSlideToggleType === undefined ? false : this.formData.booleanSlideToggleType;
      this.formData.justTextarea = this.formData.justTextarea || '';
      this.formData.AdditionalNoteQuiliEditor = this.formData.AdditionalNoteQuiliEditor || '';
      this.formData.contentQuiliMultilingual = this.formData.contentQuiliMultilingual || {};
      this.formData.DescriptionMultilingualTextarea = this.formData.DescriptionMultilingualTextarea || {};
      const socialObj = { account: '', link: ''};
      const socialArray = (this.formData.SocialsType || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
  
      this.images640 = this.formData.GalleryImagesType || [];
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
    deleteImageGalleryImagesType640(index: any): void {
      this.images640.splice(index, 1);
      this.items640 = this.form.get('GalleryImagesType') as FormArray;
      this.items640.removeAt(index);
    }

    createItemGalleryImagesType640(url= ''): FormGroup {
      return this.fb.group({
          url: url,
      });
    }

    addItemGalleryImagesType640(url: any): void {
      this.items640 = this.form.get('GalleryImagesType') as FormArray;
      this.items640.push(this.createItemGalleryImagesType640(url));
      this.images640.push({ url: url });
    }

    onUploadCompleteGalleryImagesType640(data: any): void {
      this.addItemGalleryImagesType640(data.url);
    }
    onUploadCompleteAvatarImageType825(data: any): void {
      this.form.get('AvatarImageType').get('url').markAsTouched();
      this.form.get('AvatarImageType').get('url').setValue(data.url);
    }
  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
