import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


import { ClientInfoService } from 'src/app/services/clientInfo/client-info.service';
import { ClientInfoForm } from 'src/model/ClientInfoForm';

@Component({
  selector: 'app-client-info-view',
  templateUrl: './client-info-view.component.html',
  styleUrls: ['./client-info-view.component.css']
})

export class ClientInfoViewComponent implements OnInit {
  getShortDate(control: string,innerControl: string): any {
  return (this.createClientForm.ClientForm.controls[control] as FormGroup).controls[innerControl].value
}
  dataSource = new MatTableDataSource<any>();
  createClientForm: ClientInfoForm;
  navigator: any;
  displayedMailingColumns: string[] = ['contactName', 'emailAddress', 'product', 'preferredLanguage', 'isOnMaternityLeave'];
  pageIndex: number = 0;
  isLoading: boolean = true;
  constructor(
    private clientInfoService: ClientInfoService, 
    private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute,private toastr: ToastrService
  ) {
    this.createClientForm = new ClientInfoForm(this.fb);
    this.navigator = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.pageIndex = this.navigator?.extras.state?.pageIndex ?? 0;
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id!=undefined&&id!=null) {
     if(id=="0")
       {
        this.toastr.warning("Client Not found!");
         this.router.navigate(['/client-info'],{state: { pageIndex:this.pageIndex }} );
         return;
       }
       this.getClientInfoWithOtherDetails(Number(id));
      }
      else
      {
        this.toastr.warning("Client Not found!");
        this.router.navigate(['/client-info'],{state: { pageIndex:this.pageIndex }} );
      }
  }

  private handleFetchError(msg:string): void {
    this.toastr.error(msg,"Something went wrong...");
    this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
  }
  private getClientInfoWithOtherDetails(id:number): void {
    this.isLoading = true;
    this.clientInfoService.getClientInfoWithOtherDetails(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res!=undefined) {
          this.createClientForm.ClientForm.clearValidators();
          this.createClientForm.ClientForm.updateValueAndValidity();
        this.createClientForm.ClientForm.patchValue(res);
        //  this.dataSource.data=res.mailingDto;
       // (this.createClientForm.ClientForm.controls["inflationClauseDto"] as FormGroup).patchValue(res.inflationClauseDto);
        //  this.createClientForm.ClientForm.updateValueAndValidity();
        
         console.log(res);
         console.log(this.createClientForm.ClientForm);
        } else {
          this.handleFetchError("While fetching clientInfo");
        }
        this.isLoading = false;

      },
      error: (err) => {
        this.isLoading = false;
        if(err.status!=undefined&&err.status==404)
          return;
        this.handleFetchError(err.statusText+" : While fetching clientInfo");
        console.log(err);
      }
    });
  }
  back(): void {
    this.router.navigate(['/client-info'], { state: { pageIndex: this.pageIndex } });
  }
}