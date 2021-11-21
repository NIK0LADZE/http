import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../models/employee.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
})
export class EmployeeUpdateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  form: FormGroup;
  employee: Employee;
  employeeId: string | null;
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeId = this.route.snapshot.paramMap.get('id');

    this.db.read(this.employeeId).subscribe((employee) => {
      this.isLoading = false;
      this.employee = employee[0];
      this.form = this.fb.group({
        name: [this.employee.name, Validators.required],
        salary: [this.employee.salary, Validators.required],
        age: [this.employee.age, Validators.required],
      });
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.employee = {
      name: this.form.get('name')?.value,
      salary: this.form.get('salary')?.value,
      age: this.form.get('age')?.value,
    };

    this.db.update(this.employee, this.employeeId).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/']);
    });
    this.form.reset();
  }
}
