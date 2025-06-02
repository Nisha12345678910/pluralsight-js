import { Component } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
  constructor(private scheduleService:ScheduleService,private toastr: ToastrService)
  {
  }
  isSidenavOpen: boolean = false; 
  isLoading1:boolean=false;
  public downloadReportingSchedule(): void {
    this.isLoading1 = true;
    this.scheduleService.getSchedules().subscribe({
      next: (res:Blob) => {
        this.isLoading1 = false;
        if (res!=undefined) {
          const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
       const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Reporting-Schedule.xlsx'; // Specify the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.toastr.success('Dowloaded Successfully'); // Use toastr for success  

        } else {
          this.toastr.error("Download failed"); 
        }

      },
      error: (err) => {
        this.isLoading1 = false;
        this.toastr.error("Download failed"); 
      }
    });
  }
  toggleSidenav(sidenav: any) {
    this.isSidenavOpen = !this.isSidenavOpen;
    sidenav.toggle(); 
  }}
