import { FormGroup } from '@angular/forms';

export class FormComponent {
   name: string;
   submitted: boolean;
   form: FormGroup;

   getFormValue() {
      return this.form.getRawValue();
   }

   formIsValid() {
      return this.form.valid;
   }

   markFormSubmitted() {
      this.submitted = true;
   }
}