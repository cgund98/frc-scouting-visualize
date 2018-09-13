import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { PrematchBlockComponent } from './prematch-block.component';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { EventDataService } from '../../../../app/data.service';

@Component({
  selector: 'prematch-window',
  templateUrl: './prematch-window.component.html',
})

export class PrematchWindowComponent implements OnInit {

  json;
  matchNum;
  blueTeam1; blueTeam2; blueTeam3;
  redTeam1; redTeam2; redTeam3;

  @ViewChild('blueBlock1') blueBlock1: PrematchBlockComponent;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  async ngOnInit() {
    // this.json = require('../../../../../test.json');
    var event = this.storage.get("competition");
    var url = "https://www.thebluealliance.com/api/v3/event/" + event + "/";
    var url = "https://www.thebluealliance.com/api/v3/status";
    // var url = "https://jsonplaceholder.typicode.com/todos/1"
    $.ajax({
         url: url,
         type: "GET",
         headers: {
             "X-TBA-Auth_Key": '6GAtJKQu3pi8o2MWlrCiil3kCaYONueEAngycXBAc6W5d4FJmdLDEXQ3aznfBd9M',
             "Access-Control-Allow-Headers": 'X-TBA-Auth_Key',
         },
         success: function(data) { console.log(data); }
      });
    this.json = [];
    this.json = this.json.filter(function (e) {
      return e.comp_level == 'qm';
    });
    this.json = this.json.sort(function(a, b) { return a.match_number - b.match_number });
    this.matchNum = 1;
    // console.log(this.json);
    // this.updateBlocks();
  }

  async updateMatchNum(event: any) {
      // this.json = await this._eventDataService.get();
    this.matchNum = parseInt(event.target.value);
    if (this.matchNum > 0 && this.matchNum < this.json.length) {
      // this.updateBlocks();
    // console.log("Match #", this.matchNum);
    }
  }

  // updateBlocks() {
  //   match = this.json[this.matchNum - 1];
  //   var blueTeams = match.alliances.blue.team_keys.map(function(e) {
  //     return parseInt(e.substring(3));
  //   });
  //   var redTeams = match.alliances.red.team_keys.map(function(e) {
  //     return parseInt(e.substring(3));
  //   });
  //   this.blueTeam1 = blueTeams[0];
  //   this.blueTeam2 = blueTeams[1];
  //   this.blueTeam3 = blueTeams[2];
  //   this.redTeam1 = redTeams[0];
  //   this.redTeam2 = redTeams[1];
  //   this.redTeam3 = redTeams[2];
  //
  // }

}
