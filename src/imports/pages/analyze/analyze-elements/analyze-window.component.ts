import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DataService } from '../../../../app/data.service';
import 'json-query';

@Component({
  selector: 'analyze-window',
  templateUrl: './analyze-window.component.html',
})

export class AnalyzeWindowComponent implements OnInit {

  matches: any;
  competition: string;
  query: string;

  rows = [
    {teamNum: "Please click to refresh"}
  ];
  columns = [
    // { name: 'match #', prop: 'matchNum', width: 75,
      // height: 50, },
    { name: 'Team #', prop: 'teamNum', width: 75,
      height: 50, },
    { name: 'Total Placed', prop: 'totalPlaced', width: 100,
      height: 50, },
    { name: 'Total High', prop: 'highPlaced', width: 100,
      height: 50, },
    { name: 'Total Low', prop: 'lowPlaced', width: 100,
      height: 50, },
    { name: 'Auton High', prop: 'highAutonPlaced', width: 100},
    { name: 'Auton Low', prop: 'lowAutonPlaced', width: 100, },
    { name: 'Climbed', prop: 'climbs', width: 100,
      height: 50, },
      { name: 'Avg. Run Time', prop: 'avgRunTime', width: 150,
      height: 50, },
      { name: 'Matches', prop: 'matchesPlayed', width: 100 },
  ];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private _dataService: DataService) {}

  async ngOnInit() {
    this.competition = this.storage.get("competition");
    // if (!this.competition) {window.alert("You must set the event.  Do this by clicking the 'Event' link."); return}
    if (!this.competition) this.storage.set("competition", "2018inmis");
    this.competition = this.storage.get("competition");
    this.query = "matches[event=" + this.competition + "]";
    await this.getMatches();
  }

  async getMatches() {
      this.matches = await this._dataService.get("matches.json");
      var comp = this.storage.get('competition');
      if (!this.matches) this.matches = []; return;
      this.matches = this.matches.filter(function (e) {
        return e.event == comp;
      });
      // console.log(this.matches);
  }

  async refresh() {
      this.competition = this.storage.get("competition");
      if (!this.competition) {window.alert("You must set the event.  Do this by clicking the 'Event' link."); return}
      // this.matches = Matches.find({event: this.competition}).fetch();
      if (this.matches.length !== 0) return;
      await this.getMatches();

    var teamStats = [];

    for (var i=0; i < this.matches.length; i++) {
      var match = this.matches[i];
      var teamFound = false;

      for (var j=0; j < teamStats.length; j++) {
        var team:any = teamStats[j];
        if (team.teamNum == match.teamNum ) {
          teamFound = true;
          team.matchesPlayed += 1;
          team.totalPickedUp += match.totalPickedUp;
          team.runs += match.runs.length;
          if (match.climbed) {
            team.climbs += 1;
          }
          if (!team.runTimes) {
            team.runTimes = []
          }

          for (var k=0; k < match.runs.length; k++) {
            var run = match.runs[k];
            if (!run.missedShot) {
              team.totalPlaced += 1;
              if (run.placeLocation.includes('middle')) {
                team.highPlaced += 1;
              } else {
                team.lowPlaced += 1;
              }
            }

            if (run.timeElapsed) {
              team.runTimes.push(run.timeElapsed);
            }
          }
        }
      }
      if (!teamFound) {
        var team:any = {
            teamNum: match.teamNum,
            matchesPlayed: 1,
            totalPickedUp: match.totalPickedUp,
            totalPlaced: match.totalPlaced,
            climbs: 0,
            lowPlaced: 0,
            highPlaced: 0,
            lowAutonPlaced: 0,
            highAutonPlaced: 0,
            runs: match.runs.length,
        };
        if (match.climbed) {
          team.climbs += 1;
        }
        if (!team.runTimes) {
          team.runTimes = []
        }

        for (var k=0; k < match.runs.length; k++) {
          var run = match.runs[k];
          if (!run.missedShot) {
            team.totalPlaced += 1;
            if (run.placeLocation.includes('middle')) {
              team.highPlaced += 1;
              if (run.isAuton) {
                team.highAutonPlaced +=1;
              }
            } else {
              team.lowPlaced += 1;
              if (run.isAuton) {
                team.lowAutonPlaced +=1;
              }
            }
          }

          if (run.timeElapsed) {
            team.runTimes.push(run.timeElapsed);
          }
        }
        teamStats.push(team);
      }

    }

    var rows = [];

    for (var i=0; i < teamStats.length; i++) {
      var teamStat = teamStats[i];
      var row = {
          totalPlaced: teamStat.totalPlaced,
          climbs: teamStat.climbs,
          teamNum: teamStat.teamNum,
          lowPlaced: teamStat.lowPlaced,
          highPlaced: teamStat.highPlaced,
          lowAutonPlaced: teamStat.lowAutonPlaced,
          highAutonPlaced: teamStat.highAutonPlaced,
          matchesPlayed: teamStat.matchesPlayed,
          avgRunTime: 0,
      };

      var totalTimes = 0;
      for (var j=0; j < teamStat.runTimes.length; j++) {
        totalTimes += teamStat.runTimes[j];
      }
      row.avgRunTime = Math.round(totalTimes / teamStat.runTimes.length * 10) / 10;
      rows.push(row);
    }


    this.rows = rows;
  }

}
