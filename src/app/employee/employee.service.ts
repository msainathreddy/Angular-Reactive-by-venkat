import { Injectable } from '@angular/core';
import { IEmployee } from './IEmployee'
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
//import { delay } from 'rxjs/operators';
//import { delay } from 'rxjs/internal/operators';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/observable/of';


@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient) {

    }
    
    baseUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<IEmployee[]> {
        //return of(this.listEmployees);
        return this.http.get<IEmployee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side Error', errorResponse.message);
        } else {
            console.error('Server side Error', errorResponse);
        }
        return throwError(errorResponse);
    }


    getEmployeesbyID(id:number):Observable<IEmployee>{
        return this.http.get<IEmployee>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
    }

    save(employee: IEmployee): Observable<IEmployee> { 
        //if (employee.id === null) {
        return this.http.post<IEmployee>(this.baseUrl, employee, 
            {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }
            )
        }).pipe(catchError(this.handleError));
        // below lines are required to get max id in client side 
        //const maxId = this.listEmployees.reduce(function(e1,e2){
        //     return (e1.id > e2.id) ? e1 : e2 ;
        // }).id;
        // employee.id = maxId + 1; 
        //this.listEmployees.push(employee); 
        // //} else {
        //     const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
        //     this.listEmployees[foundIndex] = employee;
        // }
    }

    updateEmployee(employee: IEmployee): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
        // below lines are required to get max id in client side 
        //const maxId = this.listEmployees.reduce(function(e1,e2){
        //     return (e1.id > e2.id) ? e1 : e2 ;
        // }).id;
        // employee.id = maxId + 1; 
        //this.listEmployees.push(employee);

    }

    deleteEmployee(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }


}
