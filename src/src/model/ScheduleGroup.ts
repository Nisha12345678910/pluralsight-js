import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export class ScheduleGroup {
    scheduleForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.scheduleForm = this.fb.group({
        scheduleId: [null],
        accountManager: this.fb.group({ 
        userId: [null, Validators.required] ,firstName: [null],lastName: [null]}),
        goLiveDate: [null, Validators.required],
        product: [null,Validators.required],
        cadence: [null, Validators.required],
        januaryCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        februaryCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        marchCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        aprilCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        mayCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        juneCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        julyCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        augustCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        septemberCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        octoberCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        novemberCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),
        decemberCalenderType: this.fb.group({scheduleCalenderId: [null], calenderType: [null] }),

      });
    }
  }