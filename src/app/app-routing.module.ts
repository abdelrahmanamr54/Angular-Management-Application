import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { AuthGuard } from './Guard/auth.guard';

import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';
import { TaskEditComponent } from './Components/task-edit/task-edit.component';


const routes: Routes = [ { path: 'login', component: LoginComponent },
  { path: 'users', component: UserFormComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task-edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },

  { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard], data: { roles: ['Manager'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
