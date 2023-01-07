import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';

@Component({
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnDestroy {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription | null = null;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {
    const id = +this.route.snapshot.paramMap.get('raceId')!;
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
    this.positionSubscription = this.raceService.live(id).subscribe(positions => (this.poniesWithPosition = positions));
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}