import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service'
import { IEmployee } from './IEmployee';
import { Router} from '@angular/router'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
 
   employeesList:IEmployee[];

  constructor(private empservice:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.empservice.getEmployees().subscribe(
      (listEmployees) => this.employeesList = listEmployees,
      (err) => console.log(err)
    )
  }

  editButtonclick(id:number){
    return this.router.navigate(['/employees/edit', id])
  }
  

}
