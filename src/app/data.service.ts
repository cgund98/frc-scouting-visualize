import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({})
};

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    get(jsonName) {
        return this.http.get('../../data/' + jsonName);
    }
}
