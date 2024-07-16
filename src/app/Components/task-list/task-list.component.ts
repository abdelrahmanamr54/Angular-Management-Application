import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/TaskService/task.service';
import { AuthService } from '../../Services/AuthService/auth.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignedUser: string;
  needsDetails?: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  private tasksKey = 'app_tasks';
   currentUserSubscription: Subscription;
  tasks: Task[] = [];
  currentUser:any;
  constructor(private taskService: TaskService, public authService: AuthService,private cdr:ChangeDetectorRef,private route :Router,private activatedRoute: ActivatedRoute) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.tasks = this.taskService.getTasks();
    
    });


  }

  ngOnInit() {
    this.loadTasks();
    this.currentUser = this.authService.getCurrentUser();
    this.tasks = this.taskService.getTasks();
    console.log('Tasks:', this.tasks);
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.tasks = this.taskService.getTasks();

    });
    if (this.currentUser?.role === 'User') {
      this.tasks = this.taskService.getTasks().filter(task => task.assignedUser=== this.currentUser.username);
    } else {
      this.tasks = this.taskService.getTasks();
    }

  this.cdr.detectChanges();
  }

  loadTasks() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (currentUser.role === 'User') {
        this.tasks = this.taskService.getTasks().filter(task => task.assignedUser === currentUser.username);
      } else {
        this.tasks = this.taskService.getTasks();
      }
    } this.cdr.detectChanges()

  }editTask(task: Task) {
    this.route.navigate(['/task-edit', task.id]);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
    this.cdr.detectChanges()
  }

  markTaskAsDone(task: Task) {
    task.status = 'Done';
    this.taskService.updateTask(task);
  }
  toggleNeedsDetails(task: Task) {
  task.needsDetails = !task.needsDetails;
  this.taskService.updateTask(task);
  }

  markTaskAsNeedDetails(task: Task) {

    this.taskService.updateTask(task);
  }
}
