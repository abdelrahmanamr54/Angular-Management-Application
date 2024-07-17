# Angular-Management-Application
Angular Task Management Application
Description
This is a task management application built using Angular. The application allows users to add, edit, delete, and list tasks. Each task has a title, description, and status (e.g., "To Do", "In Progress", "Done"). The application provides screens to define new users with roles (Admin, Manager, User) and assign any user to a manager.

Features
User Authentication (Login)
User Management (Admin only)
Task Management (CRUD operations)
Role-based Access Control
Responsive Design
Prerequisites
Node.js 
Angular CLI 

Installation
Clone the repository:


git clone https://github.com/your-username/angular-task-management.git
cd angular-task-management
Install dependencies:


npm install
Running the Application
Start the development server:


ng serve
Open your browser and navigate to:


http://localhost:4200



Usage
Default Admin User:

Username: admin


Password: admin


Login


Navigate to the login page.
Enter your credentials (e.g., for admin: username admin, password admin).
Click the "Login" button.
User Management (Admin only)
After logging in as an Admin, navigate to the "Create User" page.
Fill in the user details (username, password, role).
Click the "Create User" button.
A success alert will appear if the user is created successfully.
Task Management


Create Task (Manager only):

Navigate to the "Create Task" page.
Fill in the task details (title, description, assigned user).
Click the "Create Task" button.


Edit Task (Manager only):

Navigate to the "Tasks" page.
Click the "Edit" button on the task you want to edit.
Update the task details.
Click the "Save Changes" button.



Delete Task (Admin only):




Navigate to the "Tasks" page.
Click the "Delete" button on the task you want to delete.
Mark Task as Done/Needs Details (User):

Navigate to the "Tasks" page.



Click the "Done" or "Needs Details" button on the task assigned to you.
