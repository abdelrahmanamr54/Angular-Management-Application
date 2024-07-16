import { ChangeDetectorRef, Injectable } from '@angular/core';
import { User } from '../../User/User';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private defaultUser: User = {
username:"admin",
   password: 'admin',

    role: 'Admin'
  };
  private users: User[] = [];
  private usersKey = 'app_users';

 ensureDefaultUser(): void {
  const users = this.getUsers();
  users.push(this.defaultUser);
  localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
  constructor() {
    this.ensureDefaultUser()
  }

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];

  }
  getUsersByManager(managerUsername: string): User[] {
    return this.getUsers().filter(user => user.manager === managerUsername);
  }
  createUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  deleteUser(username: string): void {
    this.users = this.users.filter(user => user.username !== username);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.username === user.username);
    if (index !== -1) {
      this.users[index] = user;
    }}
}
