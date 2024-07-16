import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgxSpinnerModule } from "ngx-spinner";
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskEditComponent } from './Components/task-edit/task-edit.component';

import {  ReactiveFormsModule } from '@angular/forms';


import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserFormComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskEditComponent,
  
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 FormsModule,
//  FontAwesomeModule,
 ToastrModule.forRoot({
  timeOut: 10000,
  positionClass: 'toast-bottom-center',
  preventDuplicates: true,
}),
 ReactiveFormsModule,
 BrowserAnimationsModule,

    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
