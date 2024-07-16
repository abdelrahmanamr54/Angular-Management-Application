import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  role: 'Admin' | 'Manager' | 'User' = 'User';

  constructor(private authService: AuthService,private router:Router, private _snackBar: MatSnackBar,private toastr: ToastrService) {}
  loginForm:FormGroup =new FormGroup({
    username :new FormControl("",[Validators.required]),

    password: new FormControl("",[Validators.required])

  })
  onSubmit() {

   if(this.loginForm.valid){
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['tasks']);

        this.toastr.success('Login successful!', 'Success');

    } else {
      this.toastr.error('Login falied!', 'Error');

    }
   }else {

    this.loginForm.markAllAsTouched();
  }

  }

  ngOnInit(): void {
  }

}
