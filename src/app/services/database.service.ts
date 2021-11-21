import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../models/employee.model';
import { map } from 'rxjs';

@Injectable()
export class DatabaseService {
  constructor(private http: HttpClient) {}

  private linkGenerator(id: string | null = '') {
    return `https://angular-f4a64-default-rtdb.firebaseio.com/employees${id}.json`;
  }

  public create(employee: Employee) {
    const link = this.linkGenerator();
    return this.http.post(link, employee);
  }

  public readAll() {
    const link = this.linkGenerator();
    return this.http.get<{ [key: string]: Employee }>(link).pipe(
      map((responseData: any) => {
        const employeesArray = [];
        for (let key in responseData) {
          employeesArray.push({ id: key, ...responseData[key] });
        }
        return employeesArray;
      })
    );
  }

  public read(id: string | null) {
    return this.readAll().pipe(
      map((employeesArray) =>
        employeesArray.filter((employee) => employee.id === id)
      )
    );
  }

  public update(employee: Employee, id: string | null) {
    const link = this.linkGenerator('/' + id);
    return this.http.put(link, employee);
  }

  public delete(id: string | undefined | null) {
    const link = this.linkGenerator('/' + id);
    return this.http.delete(link);
  }
}
