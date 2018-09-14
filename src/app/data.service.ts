import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

const httpOptions = {
    headers: new HttpHeaders()
        .set('X-TBA-Auth_Key', "6GAtJKQu3pi8o2MWlrCiil3kCaYONueEAngycXBAc6W5d4FJmdLDEXQ3aznfBd9M")
        .set('Accept', 'application/json')
        // .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Headers', 'X-TBA-Auth_Key')
        // .set("Access-Control-Allow-Origin", "*")
        // .set('Access-Control-Request-Headers', ['Content-Type',])

};

@Injectable({
    providedIn: 'root',
})
export class DataService {

    data: any;

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    get(jsonName) {
        this.http.get('assets/data/' + jsonName).subscribe(
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
    // HAVE TO INSTALL CORS CHROME ADDON

    data: any;
    event: string;

    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http:HttpClient) {}

    async get() {
        this.event = this.storage.get("competition");
        let url = "https://www.thebluealliance.com/api/v3/event/" + this.event + "/matches";
        // var url = "https://www.thebluealliance.com/api/v3/status";
        // var url = 'https://jsonplaceholder.typicode.com/todos/1';

        try {
            let res = await this.http.get<any>(url, httpOptions).toPromise();
            // console.log(res);
            return res;
        } catch(err) {
            // console.log(err);
        }
    }
}
