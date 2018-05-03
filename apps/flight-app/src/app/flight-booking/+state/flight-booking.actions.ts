import { Flight } from "@flight-workspace/flight-api";

export enum FlightActionTypes {
  FLIGHTS_LOAD = '[Flight Booking] Flights load',
  FLIGHTS_LOADED = '[Flight Booking] Flights loaded',
  FLIGHT_UPDATE = '[Flight Booking] Flight update'
}

export class FlightsLoadAction {
  readonly type = FlightActionTypes.FLIGHTS_LOAD;
  constructor(readonly from: string, readonly to: string, readonly urgent: boolean) { 
  }
}

export class FlightsLoadedAction {
  readonly type = FlightActionTypes.FLIGHTS_LOADED;
  constructor(readonly flights: Flight[]) {
  }
}

export class FlightUpdateAction {
  readonly type = FlightActionTypes.FLIGHT_UPDATE;
  constructor(readonly flight: Flight) {
  }
}

export type FlightBookingAction = 
  FlightsLoadAction | 
  FlightsLoadedAction |
  FlightUpdateAction;
