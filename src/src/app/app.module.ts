import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
 import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
 import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ClientInfoViewComponent } from './clientInfo-ui/client-info-view/client-info-view.component';
import { ClientInfoListViewComponent } from './clientInfo-ui/client-info-list-view/client-info-list-view.component'; // Import MatTableModule
import { ClientInfoEditComponent } from './clientInfo-ui/client-info-edit/client-info-edit.component';
import { ClientInfoCreateComponent } from './clientInfo-ui/client-info-create/client-info-create.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LeftMenuComponent } from './shared/left-menu/left-menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio'; 
import { MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,FooterComponent,
    ClientInfoEditComponent,LeftMenuComponent,
    ClientInfoViewComponent,
    ClientInfoListViewComponent,
    ClientInfoCreateComponent ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() ,// ToastrModule added
    BrowserModule,FormsModule,MatTableModule,MatTabsModule,MatCheckboxModule,
    AppRoutingModule,MatPaginatorModule,
    HttpClientModule,
    BrowserAnimationsModule, MatInputModule,MatProgressSpinnerModule,ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,MatSortModule,
    MatIconModule,MatSidenavModule,MatToolbarModule,MatListModule,MatTooltipModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
