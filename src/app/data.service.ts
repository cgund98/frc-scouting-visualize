import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

const httpOptions = {
    headers: new HttpHeaders()
        .set('x-tba-auth_key', "6GAtJKQu3pi8o2MWlrCiil3kCaYONueEAngycXBAc6W5d4FJmdLDEXQ3aznfBd9M")
        .set('Accept', 'application/json')
        // .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Headers', 'X-TBA-Auth_Key')
        // .set("Access-Control-Allow-Origin", "*")
        // .set('Access-Control-Request-Headers', ['Content-Type',])
    )
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

@Injectable({
    providedIn: 'root',
})
export class EventDataService {

    data: any;
    event: string;

    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http:HttpClient) {}

    get() {
        this.event = this.storage.get("competition");
        // let url = "https://www.thebluealliance.com/api/v3/event/" + this.event + "/matches";
        // var url = "https://www.thebluealliance.com/api/v3/status";
        var url = 'https://jsonplaceholder.typicode.com/todos/1';

        this.http.get(url, {headers: new HttpHeaders()
            .set('x-tba-auth_key', "6GAtJKQu3pi8o2MWlrCiil3kCaYONueEAngycXBAc6W5d4FJmdLDEXQ3aznfBd9M")
            .set('accept', 'application/json')
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Headers', ['x-tba-auth_key', 'content-type'])
        }).subscribe(
            res => {
                console.log(res);
            },
            // err => {
            //     // console.log(url);
            //     // console.log(err);
            // }
        )
    }
}
