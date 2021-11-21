import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'employee/register', component: EmployeeRegisterComponent },
  { path: 'employees/:id', component: EmployeeComponent },
  { path: 'employees/:id/update', component: EmployeeUpdateComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
