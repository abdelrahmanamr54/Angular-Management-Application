import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignedUser: string;
  needsDetails?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'app_tasks';

  private Newtasks: Task[] = [];
  private savedtasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public tasks : Task[] = [];
 constructor() {

  const tasksJson = localStorage.getItem(this.tasksKey);
  if (tasksJson) {
    this.tasks = JSON.parse(tasksJson);
  }
  }

  getTasks(): Task[] {

    const tasksJson = localStorage.getItem(this.tasksKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }
  getTask(id: number): Task | null {
    const task = this.tasks.find(task => task.id === id);
    return task ? { ...task } : null; 
  }
  getTaskById(id: any): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
  createTask(task: Task): void {

   const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }



  private saveTasks(): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(this.tasks));
  }

  deleteTask(taskId: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));

  }
  updateTask(updatedTask: Task): void {
    let tasks = this.getTasks();
    tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }
}
