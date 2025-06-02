import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   mySubscription!: Subscription;
   //username: string = localStorage.getItem('username')??"UnAuthorized";

  constructor(private route: ActivatedRoute, private router: Router) { 
    
  }
  ngOnInit(): void {
    this.mySubscription = this.router.events.subscribe((event) => {
      // this.username = localStorage.getItem('username')??"UnAuthorized";
    });
  }
ngOnDestroy() {
  this.mySubscription?.unsubscribe();
}
}