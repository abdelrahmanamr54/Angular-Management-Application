import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/TaskService/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../User/User';
import { AuthService } from '../../Services/AuthService/auth.service';
import { UserService } from '../../Services/UserService/user.service';
import { ToastrService } from 'ngx-toastr';
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignedUser: string;
}

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  private tasksKey = 'app_tasks';
  taskId: any;
  task: any;
 Users: User[] = [];
  private tasks: Task[] = [];
  constructor(private taskService:TaskService,private router:Router,private route:ActivatedRoute,private authService:AuthService,private UserService:UserService,private toastr: ToastrService) { const tasksJson = localStorage.getItem(this.tasksKey);
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
    }

  }


    getTasks(): Task[] {
      return this.tasks;
    }



  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;

      if (currentUser?.role === 'Manager') {
        this.Users = this.UserService.getUsersByManager(currentUser.username);
      }
    this.getTaskss()

this.route.params.subscribe(params => {
  this.taskId = +params['id'];
  this.task = this.taskService.getTaskById(this.taskId);

  if (!this.task) {

    this.router.navigate(['/task-list']);

  }
});

  }



  updateTask(updatedTask: Task): void {
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;

    }
  }
  getTaskss(): Task[] {
    const tasksJson = localStorage.getItem(this.tasksKey);
    console.log(tasksJson);

    return tasksJson ? JSON.parse(tasksJson) : [];
  }


  saveChanges(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id'];

      this.task = this.taskService.getTaskById(this.taskId);
    })
      this.taskService.updateTask(this.task);
      this.router.navigate(['/tasks']);

    console.log(this.task);
    this.toastr.success("Done","Task Edited successfully")
  }



}
