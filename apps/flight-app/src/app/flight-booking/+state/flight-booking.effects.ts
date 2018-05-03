import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { FlightBookingState } from './flight-booking.interfaces';
import { FlightService } from '@flight-workspace/flight-api';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { FlightsLoadAction, FlightsLoadedAction } from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {
  constructor(
      private flightService: FlightService,
      private actions$: Actions) {
  }

  @Effect()
  flightLoad = this.actions$
    .pipe(
      filter(a => a instanceof FlightsLoadAction),
      switchMap( (a: FlightsLoadAction) => this.flightService.find(a.from, a.to, a.urgent) ),
      map(flights => new FlightsLoadedAction(flights))
      //tap(flights => console.log('Woohoo Flight Effect!!!', flights))
    )
}
