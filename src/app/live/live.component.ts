import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Subscription, switchMap, tap } from 'rxjs';

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
  error = false;
  winners: Array<PonyWithPositionModel> = [];
  betWon: boolean | null = null;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {
    const id = +this.route.snapshot.paramMap.get('raceId')!;
    this.positionSubscription = this.raceService
      .get(id)
      .pipe(
        tap((race: RaceModel) => (this.raceModel = race)),
        filter(race => this.raceModel!.status !== 'FINISHED'),
        switchMap(race => this.raceService.live(race.id))
      )
      .subscribe({
        next: positions => {
          this.poniesWithPosition = positions;
          this.raceModel!.status = 'RUNNING';
        },
        error: () => (this.error = true),
        complete: () => {
          this.raceModel!.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel!.betPonyId);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}
