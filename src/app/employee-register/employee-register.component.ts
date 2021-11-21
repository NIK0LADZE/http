import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Employee } from '../models/employee.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss'],
})
export class EmployeeRegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private router: Router
  ) {}
  form: FormGroup;
  employee: Employee;
  isLoading = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      salary: [null, Validators.required],
      age: [null, Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.employee = {
      name: this.form.get('name')?.value,
      salary: this.form.get('salary')?.value,
      age: this.form.get('age')?.value,
    };

    this.db.create(this.employee).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/']);
    });
    this.form.reset();
  }
}
