import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../UserService/user.service';
export interface User {
  username: string;
  password: string;
  role: 'Admin' | 'Manager' | 'User';
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUserSubject: BehaviorSubject<User | null>;
   currentUser: Observable<User | null>;
   private currentUserKey = 'currentUser';
 storedUser = localStorage.getItem('currentUser');
  constructor(private route:Router,private userService:UserService) {    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUserSubject = new BehaviorSubject<User | null>(this.storedUser ? JSON.parse(this.storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
 }

 login(username: string, password: string) :boolean {

  const users = this.userService.getUsers();
  const user = users.find(u => u.username === username && u.password === password );
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;

}

logout() {
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  this.route.navigate(['login']);
}

get currentUserValue(): User | null {
  return this.currentUserSubject.value;
}

isLoggedIn(): boolean {
  return !!this.currentUserValue;
}
getCurrentUser(): User | null {
  const userJson = localStorage.getItem(this.currentUserKey);
  return userJson ? JSON.parse(userJson) : null;
}

hasRole(role: 'Admin' | 'Manager' | 'User'): boolean {
  return this.currentUserValue?.role === role;
}
}
