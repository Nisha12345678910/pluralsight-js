import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

import { ClientInfoService } from 'src/app/services/clientInfo/client-info.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

import { ClientInfoForm } from 'src/model/ClientInfoForm';
import { IClientInfoDropDown } from 'src/interface/IClientInfoDropDown';
import { IScheduleDropDown } from 'src/interface/IScheduleDropDown';

@Component({
  selector: 'app-client-info-edit',
  templateUrl: './client-info-edit.component.html',
  styleUrls: ['./client-info-edit.component.css'],
  
})

export class ClientInfoEditComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  createClientForm: ClientInfoForm;
  mailingGroup!:FormGroup;
  navigator: any;
  displayedMailingColumns: string[] = ['contactName', 'emailAddress', 'product', 'preferredLanguage', 'isOnMaternityLeave', 'actions'];
  selectedIndex: number = 0;
  pageIndex: number = 0;
  isLoading: boolean = true;
  index: number | undefined;
  buttonName: string = "Add";
  id!:string;
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
    users: []
  };

  scheduleDropDown: IScheduleDropDown = { scheduleCalender: []
  };

  contactName: any;
  emailControl: any;

  constructor(
    private clientInfoService: ClientInfoService, 
    private scheduleService: ScheduleService, 
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,private toastr: ToastrService
  ) {
    this.createClientForm = new ClientInfoForm(this.fb);
    this.navigator = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.initializeControls();
    this.pageIndex = this.navigator?.extras.state?.pageIndex ?? 0;
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id!=undefined&&this.id!=null) {
     if(this.id=="0")
       {
        this.toastr.warning("Client Not found");
         this.router.navigate(['/client-info'],{state: { pageIndex:this.pageIndex }} );
         return;
       }
       this.getClientDropDown();
       this.getScheduleDropDown();
       this.getClientInfoWithOtherDetails(Number(this.id));
       
      }
      else
      {
        this.toastr.warning("Client Not found");
        this.router.navigate(['/client-info'],{state: { pageIndex:this.pageIndex }} );
      }
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
    // const index = this.mails.controls.findIndex((control: any) => {
    //   return control.get('emailAddress')?.value === email;
    // });
   const item = this.mails.at(index); 
   if((item as FormGroup).controls["mailingId"].value!=null)
   {
      item.patchValue({isDeleted:true});
   }
   else
    {
      this.mails.removeAt(index);
    }
    this.dataSource.data = this.mails.value;
   if(this.mails.value.findIndex((a:any)=>a.isDeleted==false)<0)
    this.dataSource.data=[];
    this.mailingGroup.reset();
  }

  setvalidatoresForMailing():void{
    this.contactName.setValidators([Validators.required]);
    this.emailControl.setValidators([Validators.required, Validators.email]);
    this.contactName.updateValueAndValidity();
    this.emailControl.updateValueAndValidity();
  }
  addMailingForm(): void {
    this.setvalidatoresForMailing();

    if (this.emailControl.valid && this.contactName.valid) {
       if(this.isEmailUnique(this.emailControl.value))
      {
      if (this.buttonName.toLowerCase().includes("update")) {
        const item = this.mails.at(this.index!); 
        item.setValue(this.mailingGroup.value); 
        this.index=undefined;
        this.buttonName = "Add";
      } else {

        this.mails.push(this.createMailGroup(this.mailingGroup.value));
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
           return;
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
  isEmailUnique(email: string): boolean {
    const existingNames = this.mails.controls.map((control: any, index: number) => {
      return index === this.index ? null : control.get('emailAddress')?.value;
    }).filter(email => email !== null); // Filter out null values
  
    return !existingNames.includes(email);
   // const existingNames = this.mails.controls.map((control: any) => control.get('emailAddress')?.value);
    //return !existingNames.includes(name);
  }
  private getClientInfoWithOtherDetails(id:number): void {
    this.isLoading = true;
    this.clientInfoService.getClientInfoWithOtherDetails(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res!=undefined) {
          this.createClientForm.ClientForm.patchValue(res);
          this.dataSource.data=res.mailingDto;
          this.mails.clear();
          res.mailingDto.forEach((mail: any) => {
            this.mails.push(this.createMailGroup(mail));
          });
          console.log(this.createClientForm.ClientForm.value);
        } else {
          this.handleFetchError();
        }
      },
      error: (err) => {
        this.isLoading = false;
        if(err.status!=undefined&&err.status==404)
          return;
        this.handleFetchError();
      }
    });
  }

  private getClientDropDown(): void {
    this.isLoading = true;
    this.clientInfoService.getClientDropDown().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res) {
          this.clientInfoDropDown = { ...this.clientInfoDropDown, ...res };
        } else {
          this.handleFetchError();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.handleFetchError();
      }
    });
  }
  private getScheduleDropDown(): void {
    this.isLoading = true;
    this.scheduleService.getScheduleDropDown().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res) {
          this.scheduleDropDown.scheduleCalender = res.scheduleCalender;
        } else {
          this.handleFetchError();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.handleFetchError();
      }
    });
  }
  private handleFetchError(): void {
    this.toastr.error("Something went wrong...");
    this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
  }
  private createMailGroup(mailing:any): FormGroup {
    return this.fb.group({
      mailingId: [mailing.mailingId],
      contactName: [mailing.contactName, Validators.required],
      emailAddress: [mailing.emailAddress, [Validators.required, Validators.email]],
      product: [mailing.product],
      preferredLanguage: [mailing.preferredLanguage],
      isOnMaternityLeave: [mailing.isOnMaternityLeave],
      isDeleted: [false]
    });
  }
   updateClient(): void {
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

    if (this.mails.value.findIndex((a:any)=>a.isDeleted==false)< 0) {
      this.setvalidatoresForMailing();
      if(this.mailingGroup.valid)
      {
      this.mails.push(this.createMailGroup(this.mailingGroup.value));
      this.mailingGroup.reset();
      this.dataSource.data = this.mails.value;
      }
    }

    if (this.mails.value.findIndex((a:any)=>a.isDeleted==false) >= 0) {
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
    this.clientInfoService.saveClientData(Number(this.id),this.createClientForm.ClientForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.statusCode!=undefined&&res.statusCode==200) {
          this.toastr.success("Client Saved Successfully");
          this.getClientInfoWithOtherDetails(Number(this.id));
          //this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
        } else {
          this.handleFetchError();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error("Failed to Save Client Information");
        this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
      }
    });
  }
  private focusFirstInvalidField(): void {
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