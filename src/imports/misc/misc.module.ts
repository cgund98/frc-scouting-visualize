import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventSelectionComponent } from './event-selection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule} from 'angular-webstorage-service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        StorageServiceModule,
    ],
    declarations: [
        EventSelectionComponent,
    ],
    entryComponents: [
        EventSelectionComponent,
    ],
    exports: [
        EventSelectionComponent,
    ]
})

export class MiscModule {}
