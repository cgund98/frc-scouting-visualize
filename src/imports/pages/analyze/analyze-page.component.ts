import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../app/data.service';

@Component({
    selector: 'analyze-page',
    templateUrl: './analyze-page.component.html',
})

export class AnalyzePageComponent implements OnInit {
    analysisTab;
    matches;

    constructor(private _dataService: DataService) {}

    ngOnInit() {
        this.analysisTab = true;
        var i = 0;
        while(true) {
            this.matches = this._dataService.get("matches.json");
            if (this.matches.length > 0 || i > 10000) {
                console.log('Loaded...');
                break;
            }
            i++;
        }
    }
    changeTab() {
        this.analysisTab = !this.analysisTab;
    }

}
