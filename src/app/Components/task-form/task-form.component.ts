import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/TaskService/task.service';
import { UserService } from '../../Services/UserService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
export interface User {
  username: string;
  password: string;
  role: 'Admin' | 'Manager' | 'User';
}
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignedUser: string;
}
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  title = '';
  description = '';
  status: 'To Do' | 'In Progress' | 'Done' = 'To Do';
  assignedUser = '';
  users: User[] = [];

  constructor(private taskService: TaskService, private userService: UserService, private _snackBar: MatSnackBar,private authService:AuthService,private toaster:ToastrService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.role === 'Manager') {
      this.users = this.userService.getUsersByManager(currentUser.username);
    }

  }

  loadUsers() {
    this.users = this.userService.getUsers().filter(user => user.role === 'User');
  }

  onSubmit() {
    const newTask: Task = {
      id: Date.now(), 
      title: this.title,
      description: this.description,
      status: this.status,
      assignedUser: this.assignedUser};
      this.taskService.createTask(newTask);

    this.toaster.success("Done","Task Created successfully")
      this.resetForm();
    }
  getusers(){
    this.users = this.userService.getUsers();
    console.log('Users:', this.users);
  }
    resetForm() {
      this.title = '';
      this.description = '';
    }

    }
