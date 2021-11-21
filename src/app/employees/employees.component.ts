import { Component, OnInit } from '@angular/core';

import { Employee } from '../models/employee.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  constructor(private db: DatabaseService) {}
  employees: Employee[] = [];
  startingItem: number;
  itemPerLoad: number;
  isLoading = false;
  btnDisabled = false;
  canLoad = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.startingItem = 0;
    this.itemPerLoad = 5;
    this.onLoad();
  }

  private displayEmployees() {
    this.db.readAll().subscribe((employees) => {
      this.isLoading = false;
      this.employees.push(...employees);
    });
  }

  onLoad() {
    this.btnDisabled = true;
    this.db.readAll().subscribe((employees) => {
      this.isLoading = false;
      this.btnDisabled = false;

      const startingItem = this.startingItem;
      const itemPerLoad = this.itemPerLoad;

      for (let i = startingItem; i < startingItem + itemPerLoad; i++) {
        if (i < employees.length) {
          this.employees.push(employees[i]);
          if (i + 1 === employees.length) {
            this.canLoad = false;
          }
        }
      }

      this.startingItem = this.startingItem + this.itemPerLoad;
    });
  }

  onDelete(id: string | undefined | null) {
    this.isLoading = true;
    this.db.delete(id).subscribe(() => {
      this.employees = [];
      this.displayEmployees();
    });
  }
}
