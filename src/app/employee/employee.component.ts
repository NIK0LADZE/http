import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  employee: Employee;
  employeeId: string | null;
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.db.read(this.employeeId).subscribe((employee) => {
      this.isLoading = false;
      this.employee = employee[0];
    });
  }

  updateHandler(id: number | string | undefined) {
    this.router.navigate(['employees', id, 'update']);
  }

  onDelete(id: string | null) {
    this.isLoading = true;
    this.db.delete(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
