import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/UserService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface User {
  username: string;
  password: string;
  role: 'Admin' | 'Manager' | 'User';
  manager?: string;
}
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  users: User[] = [];
  username = '';
  password = '';
  role: 'Admin' | 'Manager' | 'User' = 'User';
  manager = '';
  managers: User[] = [];

  constructor(private userService: UserService, private _snackBar: MatSnackBar,private toaster :ToastrService) {
}

  ngOnInit() {
    this.loadManagers();
    this.getusers();
  }

  loadManagers() {
    this.managers = this.userService.getUsers().filter(user => user.role === 'Manager');
  }
  onRoleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.role = selectElement.value as 'Admin' | 'Manager' | 'User';
    if (this.role === 'User') {
      this.loadManagers();
    } else {
      this.manager = '';
    }
  }
  onSubmit() {

      const newUser: User = { username: this.username, password: this.password, role: this.role,manager:this.manager };
      this.userService.createUser(newUser);
      this.toaster.success("done","User Created successfully")

      this.resetForm();

  }
getusers(){
  this.users = this.userService.getUsers();
  console.log('Users:', this.users);
}
  resetForm() {
    this.username = '';
    this.password = '';
    this.role = 'User';
    this.manager = '';
  }
}
