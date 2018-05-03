import {createSelector} from '@ngrx/store';
import { FlightBookingState, FlightBooking } from './flight-booking.interfaces';

// Selectors are our DB queries
export let getFlightBooking = (s: FlightBookingState) => s.flightBooking;

export const getFlights = createSelector(
    getFlightBooking,
    (state: FlightBooking) => state.flights
);