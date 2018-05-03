import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Flight } from '@flight-workspace/flight-api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
  delay,
  takeUntil
} from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  control = new FormControl();
  online$: Observable<boolean>;
  flights$: Observable<Flight[]>;
  loading: boolean;
  online: boolean = false;
  timerSub: Subscription;
  destroy$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.control = new FormControl();

    this.online$ = interval(2000).pipe(
        startWith(0),
        map(x => Math.random() < 0.5),
        distinctUntilChanged(),
        tap(x => this.online = x)
      );

    this.flights$ =
      this.control
        .valueChanges
        .pipe(
          debounceTime(300),
          filter(value => value.length >=3 ),
          combineLatest(this.online$),
          filter(combine => combine[1]),
          map(combine => combine[0]),
          distinctUntilChanged(),
          tap(() => this.loading = true),
          switchMap(input => this.load(input)),
          tap(() => this.loading = false)
        );    
        
    /* this.control.valueChanges.subscribe(
      data => { console.log(data); },
      error => {},
      () => {}
    ); */

    /* this.timerSub = timer(0, 2000)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
      data => { console.log(data); }
    ); */

    // ALT: vor ng 5.0, rxjs 5.5
    //Observable.timer(0,2000).takeUntil(this.destroy$).subscribe();

    /* of({
          id: 1,
          name: 'test'
        }).pipe(
          delay(3000)
        ).subscribe(
          data => { console.log(data); }
        ); */
  }
  
  load(from: string):Observable<Flight[]> {
    let url = "http://www.angular.at/api/flight";
    //let url = '/assets/data/data.json';

    let params = new HttpParams()
      .set('from', from);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    //this.timerSub.unsubscribe();
  }

}
