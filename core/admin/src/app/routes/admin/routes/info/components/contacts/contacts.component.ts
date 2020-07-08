import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() data: any;
  @Output() update = new EventEmitter<any>();

  form: FormGroup;
  submitted: boolean;
  mapLocation = {
    lat: 41.588605,
    lng: 44.717659,
    zoom: 12,
  };
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      contact: this.fb.group({
        phone: [this.data.contact.phone || '', Validators.required],
        email: [this.data.contact.email || '', [Validators.required, Validators.email]],
        address: this.fb.group({
          ge: [this.data.contact.address.ge || ''],
          en: [this.data.contact.address.en || ''],
          ru: [this.data.contact.address.ru || ''],
        }),
        adminEmail: [this.data.contact.adminEmail || ''],
      }),
    });
  }

  submit() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }
  locationParams(data: any) {
    console.log('map location params in parent component: ', data);
  }

}
