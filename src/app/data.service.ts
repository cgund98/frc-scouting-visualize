import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({})
};

@Injectable({
    providedIn: 'root',
})
export class DataService {

    data: any;

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    get(jsonName) {
        this.http.get('/assets/data/' + jsonName).subscribe(
        res => {
              // console.log(res);
              this.data = res;
            },
            err => {
              console.log("Error occured");
              console.log(err);
            }
          );
        // console.log(this.data);
        return this.data;
    }
}
