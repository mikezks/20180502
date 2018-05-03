import { Component, OnInit } from '@angular/core';
import { FlightService, Flight } from '@flight-workspace/flight-api';
import { EventService } from '../../event.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FlightBookingState } from '../+state/flight-booking.interfaces';
import { FlightsLoadedAction, FlightUpdateAction } from '../+state/flight-booking.actions';
import { take } from 'rxjs/operators';
import { getFlights } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;
  flights$: Observable<Flight[]>;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    '3': true,
    '5': true
  };

  constructor(
    private flightService: FlightService,
    private eventService: EventService,
    private store: Store<FlightBookingState>
  ) {}

  ngOnInit() {
    //this.flights$ = this.store.select(s => s.flightBooking.flights);
    this.flights$ = this.store.select(getFlights);
  }

  search(): void {
    if (!this.from || !this.to) return;
  
    // old:
    this.flightService.load(this.from, this.to, this.urgent);
  
    // new:
    this.flightService
        .find(this.from, this.to, this.urgent)
        .subscribe(
          flights => { 
            this.store.dispatch(new FlightsLoadedAction(flights));
          },
          error => {
            console.error('error', error);
          } 
        );
  }
  
  delay(): void {
    //this.flightService.delay();
  
    this.flights$.pipe(take(1)).subscribe(flights => {
      const flight = flights[0];
  
      const oldDate = new Date(flight.date);
      const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const newFlight = { ...flight, date: newDate.toISOString() };
      
      this.store.dispatch(new FlightUpdateAction(newFlight));
    });
  }

  select(f: Flight, selected: boolean): void {
    this.basket[f.id] = selected;
    this.eventService.publishFlight(f);
  }
}
