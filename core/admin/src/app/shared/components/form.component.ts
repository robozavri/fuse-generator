import { FormGroup } from '@angular/forms';

export class FormComponent {
   name: string;
   submitted: boolean;
   form: FormGroup;

   getFormValue(): any {
      return this.form.getRawValue();
   }

   formIsValid(): any {
      this.form.markAllAsTouched();
      return this.form.valid;
   }

   markFormSubmitted(): void {
      this.submitted = true;
   }
}