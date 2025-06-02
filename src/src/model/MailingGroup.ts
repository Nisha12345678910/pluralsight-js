
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export class MailingGroup {
    mailingForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.mailingForm = this.fb.group({
        mailingId: [null],
        contactName: [null, Validators.required],
        emailAddress: [null, [Validators.required, Validators.email]],
        product: [null],
        preferredLanguage: [null],
        isOnMaternityLeave: [false],
        isDeleted: [false]
      });
    }
  }
  