import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import template from './analyze-window.component.html';

import { Matches } from '../../../../collections/matches.collection';

@Component({
  selector: 'analyze-window',
  template
})

export class AnalyzeWindowComponent implements OnInit {

  matches;
  competition: string;

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

  ngOnInit() {
    this.competition = SessionAmplify.get("competition");
    if (!this.competition) {window.alert("You must set the event.  Do this by clicking the 'Event' link."); return}
    this.matches = Matches.find({event: this.competition}).fetch();
    if (this.matches.length > 0) {
      this.refresh();
    }
  }

  refresh() {
      this.competition = SessionAmplify.get("competition");
      if (!this.competition) {window.alert("You must set the event.  Do this by clicking the 'Event' link."); return}
      this.matches = Matches.find({event: this.competition}).fetch();

    var teamStats = [];

    for (var i=0; i < this.matches.length; i++) {
      var match = this.matches[i];
      var teamFound = false;

      for (var j=0; j < teamStats.length; j++) {
        var team = teamStats[j];
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
        var team = {};
        team.teamNum = match.teamNum;
        team.matchesPlayed = 1;
        team.totalPickedUp = match.totalPickedUp;
        team.totalPlaced = match.totalPlaced;
        team.climbs = 0;
        team.totalPlaced = 0;
        team.lowPlaced = 0;
        team.highPlaced = 0;
        team.lowAutonPlaced = 0;
        team.highAutonPlaced = 0;
        team.runs = match.runs.length;
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
      var row = {};
      var teamStat = teamStats[i];
      row.totalPlaced = teamStat.totalPlaced;
      row.climbs = teamStat.climbs;
      row.teamNum = teamStat.teamNum;
      row.lowPlaced = teamStat.lowPlaced;
      row.highPlaced = teamStat.highPlaced;
      row.lowAutonPlaced = teamStat.lowAutonPlaced;
      row.highAutonPlaced = teamStat.highAutonPlaced;
      row.matchesPlayed = teamStat.matchesPlayed;

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
