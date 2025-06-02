import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export class InflationClauseGroup {
    inflationClauseForm: FormGroup;
    constructor(private fb: FormBuilder) {
      this.inflationClauseForm = this.fb.group({
        inflationClauseId: [null],
        vendorName: [null, Validators.required],
        vendorCost: [null, Validators.required],
        isInflationClause: [null, Validators.required],
        effectiveDate1: [new Date(), Validators.required],
        clause: [null,Validators.required],
        effectiveDate2: [null],
        effectiveDate3: [null],
        noticePeriod: [null],
        oldMonthlyFlatAmount: [null],
        oldPEPM: [null],
        newFlatAmount: [null],
        newPEPM: [null],
        definition: [null],
      });
    }
  }
