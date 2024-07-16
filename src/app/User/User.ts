export interface User {
  username: string;
  password: string;
  role: 'Admin' | 'Manager' | 'User';
  manager?: string; // Optional field for Manager assignment
}
