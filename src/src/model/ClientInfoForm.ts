import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailingGroup } from './MailingGroup';
import { ClientInfoGroup } from './ClientInfoGroup';
import { InflationClauseGroup } from './InflationClauseGroup';
import { ScheduleGroup } from './ScheduleGroup';

export class ClientInfoForm {
  ClientForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.ClientForm = this.fb.group({
            clientInfoDto: (new ClientInfoGroup(fb)).clientInfoForm,
            mailing:(new MailingGroup(fb)).mailingForm ,
            mailingDto:this.fb.array([],Validators.minLength(1)),
            scheduleDto:(new ScheduleGroup(fb)).scheduleForm ,
            inflationClauseDto :(new InflationClauseGroup(fb)).inflationClauseForm 
          });
  }
}
