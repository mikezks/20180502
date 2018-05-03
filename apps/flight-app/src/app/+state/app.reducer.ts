import { App } from './app.interfaces';
import { AppAction, AppActionTypes } from './app.actions';

export function appReducer(state: App, action: AppAction): App {
  switch (action.type) {
    case AppActionTypes.INCREASE_BY: {
      return { count: state.count + action.amount }
    }
    default: {
      return state;
    }
  }
}
