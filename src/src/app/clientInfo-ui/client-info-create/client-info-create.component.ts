import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ClientInfoService } from 'src/app/services/clientInfo/client-info.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';


import { ClientInfoForm } from 'src/model/ClientInfoForm';
import { IClientInfoDropDown } from 'src/interface/IClientInfoDropDown';
import { IScheduleDropDown } from 'src/interface/IScheduleDropDown';


@Component({
  selector: 'app-client-info-create',
  templateUrl: './client-info-create.component.html',
  styleUrls: ['./client-info-create.component.css']
})
export class ClientInfoCreateComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  createClientForm: ClientInfoForm;
  mailingGroup!:FormGroup;
  navigator: any;
  displayedMailingColumns: string[] = ['contactName', 'emailAddress', 'product', 'preferredLanguage', 'isOnMaternityLeave', 'actions'];
  selectedIndex: number = 0;
  pageIndex: number = 0;
  isLoading: boolean = true;
  index!: number;
  buttonName: string = "Add";

  clientInfoDropDown: IClientInfoDropDown = {
    clientStatuses: [],
    products: [],
    accesses: [],
    hrisSystems: [],
    virtualCares: [],
    digitalMentalHealthTherapies: [],
    eapEmployerProvideds: [],
    payrollProcessingFrequencies: [],
    payrollCalendars: [],
    insurers: [],
    users: []  };

  scheduleDropDown: IScheduleDropDown = { scheduleCalender: []
  };

  contactName: any;
  emailControl: any;

  constructor(
    private clientInfoService: ClientInfoService,
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private router: Router,private toastr: ToastrService
  ) {
    this.createClientForm = new ClientInfoForm(this.fb);
    this.navigator = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.initializeControls();
    this.pageIndex = this.navigator?.extras.state?.pageIndex ?? 0;
    this.fetchClientInfoData();

  }

  private initializeControls(): void {
    this.mailingGroup = this.createClientForm.ClientForm.controls["mailing"] as FormGroup;
    this.contactName = this.mailingGroup.controls['contactName'];
    this.emailControl = this.mailingGroup.controls['emailAddress'];
  }

  get mails(): FormArray {
    return this.createClientForm.ClientForm.get("mailingDto") as FormArray;
  }

  deleteMailing(index: number): void {
    this.mails.removeAt(index);
    this.dataSource.data = this.mails.value;
  }

  setvalidatoresForMailing():void{
    this.contactName.setValidators([Validators.required]);
    this.emailControl.setValidators([Validators.required, Validators.email]);
    this.contactName.updateValueAndValidity();
    this.emailControl.updateValueAndValidity();
  }
  isEmailUnique(email: string): boolean {
    const existingNames = this.mails.controls.map((control: any, index: number) => {
      return index === this.index ? null : control.get('emailAddress')?.value;
    }).filter(email => email !== null); // Filter out null values
  
    return !existingNames.includes(email);
   // const existingNames = this.mails.controls.map((control: any) => control.get('emailAddress')?.value);
    //return !existingNames.includes(name);
  }
  addMailingForm(): void {
   this.setvalidatoresForMailing();

    if (this.emailControl.valid && this.contactName.valid) {
      if(this.isEmailUnique(this.emailControl.value))
        {
      if (this.buttonName.toLowerCase().includes("update")) {
        const item = this.mails.at(this.index); 
        item.patchValue(this.mailingGroup.value); 
        this.buttonName = "Add";
      } else {
        this.mails.push(this.createMailGroup());
      }


      this.mailingGroup.reset();
      this.dataSource.data = this.mails.value;
    }
      else
      this.toastr.error("Email must be unique");
    } else {
      this.markControlsAsTouched();
    }
  }

  private markControlsAsTouched(): void {
    this.emailControl.markAsTouched();
    this.contactName.markAsTouched();
    if(!this.contactName.valid)
      {
        const nControl = document.getElementsByName("mailing.contactName")[0] as HTMLElement;
        if(nControl)
          {
           nControl.focus();
           return
         }
      }
      else
      {
      const eControl = document.getElementsByName("mailing.emailAddress")[0] as HTMLElement;
      if(eControl)
        eControl.focus();
       }
 
  }

  editMailing(index: number): void {
    this.mailingGroup.patchValue(this.mails.at(index).value);
    this.index = index;
    this.buttonName = "Update";
  }

  private fetchScheduleCalendar(): void {
    this.isLoading = true;
    this.scheduleService.getScheduleDropDown().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res) {
          this.scheduleDropDown.scheduleCalender = res.scheduleCalender;
        } else {
          this.handleFetchError("While fetching Schedule Dropdown");
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.handleFetchError(err.statusText+" : While fetching Schedule DropDown");
      }
    });
  }

  private fetchClientInfoData(): void {
    this.isLoading = true;
    this.clientInfoService.getClientDropDown().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res!=undefined) {
          this.clientInfoDropDown = { ...this.clientInfoDropDown, ...res };
          this.fetchScheduleCalendar();
        } 
        else if(res==undefined){
          this.handleFetchError("While fetching Client DropDown");
          
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.handleFetchError(err.statusText+" : While fetching Client DropDown");
      }
    });
  }

  private handleFetchError(msg:string): void {
    this.toastr.error(msg,"Something went wrong...");
    this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
  }

  createMailGroup(): FormGroup {
    return this.fb.group({
      contactName: [this.contactName.value, Validators.required],
      emailAddress: [this.emailControl.value, [Validators.required, Validators.email]],
      product: [this.mailingGroup.controls['product'].value],
      preferredLanguage: [this.mailingGroup.controls['preferredLanguage'].value],
      isOnMaternityLeave: [this.mailingGroup.controls['isOnMaternityLeave'].value]
    });
  }

  createClient(): void {
    let selectedStatus=this.clientInfoDropDown.clientStatuses.find(a=>a.clientStatusId==(((this.createClientForm.ClientForm.controls["clientInfoDto"] as FormGroup).controls['clientStatus'] as FormGroup).controls['clientStatusId'].value))?.status.toLowerCase()!;
    if (selectedStatus!=undefined&&(selectedStatus.includes("terminating") || selectedStatus.includes("terminated"))) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.toastr.error("Please select Terminating date as per Status");
      ((this.createClientForm.ClientForm.controls["clientInfoDto"] as FormGroup).controls['terminatingDate'] as FormGroup).setValidators(Validators.required);
      ((this.createClientForm.ClientForm.controls["clientInfoDto"] as FormGroup).controls['terminatingDate'] as FormGroup).updateValueAndValidity();
      return;
    }
    else{
      ((this.createClientForm.ClientForm.controls["clientInfoDto"] as FormGroup).controls['terminatingDate'] as FormGroup).clearValidators();
      ((this.createClientForm.ClientForm.controls["clientInfoDto"] as FormGroup).controls['terminatingDate'] as FormGroup).updateValueAndValidity();
    }
    if (this.mails.length === 0) {
      this.setvalidatoresForMailing();
      if(this.mailingGroup.valid)
      {
      this.mails.push(this.createMailGroup());
      this.mailingGroup.reset();
      this.dataSource.data = this.mails.value;
      }
    }

    if (this.mails.length > 0) {
      this.clearMailingValidators();
    }

    if (this.createClientForm.ClientForm.valid) {
      this.validateAndSubmitClient();
    } else {
      this.focusFirstInvalidField();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private clearMailingValidators(): void {
    this.emailControl.clearValidators();
    this.contactName.clearValidators();
    this.contactName.updateValueAndValidity();
    this.emailControl.updateValueAndValidity();
  }

  private validateAndSubmitClient(): void {
    // let selectedStatus=this.clientInfoDropDown.clientStatuses.find(a=>a.clientStatusId==(((this.createClientForm.ClientForm.controls["clientInfoDto"] as FormGroup).controls['clientStatus'] as FormGroup).controls['clientStatusId'].value))?.status.toLowerCase()!;
    // if (selectedStatus.includes("terminating") || selectedStatus.includes("terminated")) {
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    //   this.toastr.error("Please select Terminating date as per Status");
    //   return;
    // }

    this.isLoading = true;
    this.clientInfoService.createClientData(this.createClientForm.ClientForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.statusCode === 200) {
          this.toastr.success("Client Saved Successfully");
          this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
        } else {
          this.handleFetchError("While creating the client");
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.handleFetchError(err.statusText+" : Failed to save client-Info",);
      }
    });
  }

  focusFirstInvalidField(): void {
    let firstInvalidControl=null;
    switch(false)
    {
      case this.createClientForm.ClientForm.controls["clientInfoDto"].valid:
        this.selectedIndex=0;
        firstInvalidControl=this.findFirstInvalidControl(this.createClientForm.ClientForm.controls["clientInfoDto"] as FormGroup,"clientInfoDto");
        break;
      case this.mailingGroup.valid:
        this.selectedIndex=1;
        firstInvalidControl=this.findFirstInvalidControl(this.mailingGroup,"mailing");
        break;
      case this.createClientForm.ClientForm.controls["scheduleDto"].valid:
        this.selectedIndex=2;
        firstInvalidControl=this.findFirstInvalidControl(this.createClientForm.ClientForm.controls["mailing"] as FormGroup,"scheduleDto");
        break;
      case this.createClientForm.ClientForm.controls["inflationClauseDto"].valid:
        this.selectedIndex=3;
        firstInvalidControl= firstInvalidControl=this.findFirstInvalidControl(this.createClientForm.ClientForm.controls["inflationClauseDto"] as FormGroup,"inflationClauseDto");
        break;
      default:
        this.selectedIndex=0;
        break;                         
    }
    if (firstInvalidControl) {
      const invalidControl = document.getElementsByName(firstInvalidControl)[0] as HTMLElement;
      if (invalidControl) {
        invalidControl.focus();
      }
    }
  }

  private findFirstInvalidControl(group: FormGroup, controlName: string): string | null {
    for (const innerControlName in group.controls) {
      const control = group.get(innerControlName);
      if (control && control.invalid) {
        return `${controlName}.${innerControlName}`;
      }
    }
    return null;
  }
  back(): void {
    this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
  }
}
