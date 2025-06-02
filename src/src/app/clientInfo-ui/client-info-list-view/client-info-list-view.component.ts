import { Component, OnInit, SimpleChange, ViewChild ,} from '@angular/core';
import {  Router } from '@angular/router';
import { ClientInfoService } from 'src/app/services/clientInfo/client-info.service';
import { MatPaginator } from '@angular/material/paginator';
import {  Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IPagination } from 'src/interface/IPagination';
import { User } from 'src/interface/IClientInfo';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-client-info-list-view',
  templateUrl: './client-info-list-view.component.html',
  styleUrls: ['./client-info-list-view.component.css']
})
export class ClientInfoListViewComponent implements OnInit{

  clients = new MatTableDataSource<any>();
  isLoading: boolean = true;
 isViewMode:boolean | undefined;  
 displayedColumns: string[] = ['name', 'status', 'terminatingDate','planRenewalDate','consultant' ,'actions'];
page:IPagination=
{searchTerm:'',
 pageSize:  5, 
 pageIndex: 0,
 length:0,
};
navigator:any;
maxall : number=20;
getPageSizeOptions(): any[] {
if (this.page.length>this.maxall)
return [5, 10, this.page.length];
else
return [5, 10, this.maxall];
}
private searchSubject: Subject<string> = new Subject<string>(); 
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 constructor(private clientInfoService: ClientInfoService, private router: Router,private toastr: ToastrService) { 
  this.navigator = this.router.getCurrentNavigation();
  document.documentElement.style.setProperty(`--background-color`, 'red');

 }
 ngOnInit(): void {
  this.clients.sort = this.sort;

  this.clients.paginator = this.paginator;
  if (this.navigator!=undefined&&this.navigator.previousNavigation!=null&&this.navigator?.extras.state) 
    {
      if(this.page.pageIndex==0)
      this.page.pageIndex = this.navigator?.extras.state.pageIndex??0;
    }
  this.fetchClienInfotData();
  this.searchSubject.pipe(
    debounceTime(1) 
  ).subscribe(search => {
    this.page.searchTerm = search; 
    this.applySearch(); 
  });
 }
 ngAfterViewInit(): void {
  this.paginator.page.subscribe(page=>{
    this.onPageChange(page);
  })
 }
onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }
  getUserName(user: User): any {
    if(user.firstName)
      if(user.lastName)
        return user.firstName+' '+user.lastName;
      return null;
    }
 fetchClienInfotData(): void {
   this.clientInfoService.getClientInfos(this.page).subscribe({
     next:(res)=>{
      this.isLoading = false;
      if(res!=undefined&& res!=null)
        {              
          this.clients.data= res.clientInfoDtos;
           this.page.length = res.totalSize;
         return;
        }
        this.toastr.error("Something went wrong...");
     },
    error:(err)=>{
      this.isLoading = false;
      console.log(err);
      this.toastr.clear();
      this.toastr.error(err.statusText,"Something went wrong...");
    }
     });
   }

 createClient() {
     this.router.navigate(['/client-info/create'], {state: { pageIndex:this.page.pageIndex }} );
   }
 editClient(clientId:Number) {
   this.router.navigate(['/client-info/edit',clientId],{ state: { pageIndex:this.page.pageIndex } });
 }
 viewClient(clientId:Number) {
   this.router.navigate(['/client-info/view', clientId],{  state: { pageIndex:this.page.pageIndex } });
 }
applySearch() {
  this.page.pageIndex = 0; 
  this.fetchClienInfotData();
}

onPageChange(event: any) {
  this.page.pageIndex = event.pageIndex;
  this.page.pageSize = event.pageSize;
 this.fetchClienInfotData();  
}
announceSortChange(sortState: Sort) {
  this.page.nameSortAsc=undefined;
  this.page.statusSortAsc=undefined;
  this.page.planRenewalDateSortAsc=undefined;
  this.page.terminatingDateSortAsc=undefined;
  this.page.consultantSortAsc=undefined;

 switch(sortState.active)
 {
  case "name":
    if(sortState.direction.includes("asc"))
     this.page.nameSortAsc=true;
    else
     this.page.nameSortAsc=false;
    break;
    case "status":
      if(sortState.direction.includes("asc"))
       this.page.statusSortAsc=true;
      else
       this.page.statusSortAsc=false;
    break;
    case "terminatingDate":
      if(sortState.direction.includes("asc"))
       this.page.terminatingDateSortAsc=true;
      else
       this.page.terminatingDateSortAsc=false;
    break;
    case "planRenewalDate":
      if(sortState.direction.includes("asc"))
       this.page.planRenewalDateSortAsc=true;
      else
       this.page.planRenewalDateSortAsc=false;
    break;
    case "consultant":
      if(sortState.direction.includes("asc"))
       this.page.consultantSortAsc=true;
      else
       this.page.consultantSortAsc=false;
    break;
 }
  this.fetchClienInfotData();  
}
}
