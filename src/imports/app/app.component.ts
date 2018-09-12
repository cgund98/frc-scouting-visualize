import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { Tasks } from '../../../both/collections/tasks.collection';
// import { Task } from '../../../both/models/task.model';

import template from './app.component.html';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template
})

export class AppComponent {
  eventSelectionOpen: boolean;

  constructor() {}

}
