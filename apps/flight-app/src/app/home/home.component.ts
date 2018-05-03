import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.interfaces';
import { AppActionTypes, IncreaseByAction } from '../+state/app.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  needsLogin: boolean;
  _userName: string = '';
  count$: Observable<number>;
  
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.count$ = this.store.select(state => state.app.count);
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => (this.needsLogin = !!params['needsLogin'])
    );
  }

  get userName(): string {
    return this._userName;
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!';
  }

  logout(): void {
    this._userName = '';
  }

  countUp() {
    this.store.dispatch(new IncreaseByAction(1));
  }
}
