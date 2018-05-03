import { TestBed, async } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { FlightBookingEffects } from './flight-booking.effects';

describe('FlightBookingEffects', () => {
  let actions;
  let effects: FlightBookingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        FlightBookingEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(FlightBookingEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(effects.loadData).toBeObservable(
        hot('-a-|', { a: { type: 'DATA_LOADED', payload: {} } })
      );
    });
  });
});
