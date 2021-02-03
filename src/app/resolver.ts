import { Injectable, OnInit } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators'
import { HomeServiceService } from './Service/home-service.service';

@Injectable({
    providedIn: 'root'
})

export class RouteResolver implements Resolve<any>, OnInit {

    
    constructor(private http: HttpClient, private router: Router) {
        // this.http.get('assets/json/validations.json').subscribe((res) => {
        //    console.log('--- result :: ', this.jsonDataResult);
        // });
    }

    ngOnInit() {}
    

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
       const urlPath = route.url;
       console.log("******" + urlPath);
        return this.http.get(`assets/json/${urlPath}/validations.json`)
            .pipe(catchError(error => {
                return EMPTY
            }), mergeMap(something => {
                if (something) {
                    return of(something)
                } else {
                    return EMPTY;
                }
            })
            )
    }

   
};