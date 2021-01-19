import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule} from '@angular/common/http'
import { IWatch} from '../employee/IWatch'
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
                   

@Injectable({
  providedIn: 'root'
})                                
export class HomeServiceService { 

  private homemessagesource = new Subject<string>();
  homemessage$= this.homemessagesource.asObservable();

  baseUrl = 'http://localhost:3000/watch';
  constructor(private http: HttpClient) { }

  sendMessage(message: string){
    this.homemessagesource.next(message);
  }

  getWatches(): Observable<IWatch[]> {
    return this.http.get<IWatch[]>(this.baseUrl)
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

}
