import { Component } from '@angular/core';

import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  races: Array<RaceModel> = [{ name: 'Lyon' }, { name: 'London' }];
}
