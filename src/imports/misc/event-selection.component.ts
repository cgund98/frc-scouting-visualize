import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
    selector: 'event-selection',
    templateUrl: './event-selection.component.html',
})

export class EventSelectionComponent implements OnInit {

    openValue: boolean = false;
    @Output() openChange = new EventEmitter();

    competition: FormControl;
    currentComp: string;

    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

    @Input()
    get open() {
        return this.openValue;
    }

    set open(val) {
        this.openValue = val;
        this.openChange.emit(this.openValue);
    }

    ngOnInit() {
        this.currentComp = this.storage.get("competition");
        this.competition = new FormControl(this.currentComp, Validators.required);
    }

    test() {
        console.log(this.openValue);
    }

    change() {
        if (this.competition.invalid) {console.log('invalid');return}
        this.storage.set("competition", this.competition.value)
        this.currentComp = this.competition.value;
        this.open = false;

    }

}
