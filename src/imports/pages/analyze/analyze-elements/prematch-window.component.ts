import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { PrematchBlockComponent } from './prematch-block.component';

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

    constructor(private _eventDataService: EventDataService) {}

    async ngOnInit() {
        await this.getCompetition();
        this.matchNum = 1;
        // console.log(this.json);
        this.updateBlocks();
    }

    async getCompetition() {
        this.json = await this._eventDataService.get();
        if (!this.json) this.json = [];
            this.json = this.json.filter(function (e) {
            return e.comp_level == 'qm';
        });
        this.json = this.json.sort(function(a, b) { return a.match_number - b.match_number });
    }

    async updateMatchNum(event: any) {
        // await this.getCompetition();
        this.matchNum = parseInt(event.target.value);
        if (this.matchNum > 0 && this.matchNum < this.json.length) {
            this.updateBlocks();
        // console.log("Match #", this.matchNum);
        }
    }

    updateBlocks() {
        // console.log(this.json);
        let match = this.json[this.matchNum - 1];
        var blueTeams = match.alliances.blue.team_keys.map(function(e) {
            return parseInt(e.substring(3));
        });
        var redTeams = match.alliances.red.team_keys.map(function(e) {
            return parseInt(e.substring(3));
        });
        this.blueTeam1 = blueTeams[0];
        this.blueTeam2 = blueTeams[1];
        this.blueTeam3 = blueTeams[2];
        this.redTeam1 = redTeams[0];
        this.redTeam2 = redTeams[1];
        this.redTeam3 = redTeams[2];

    }

}
