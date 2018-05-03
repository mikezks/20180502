export enum AppActionTypes {
  INCREASE_BY = '[App] Increase by'
}

export class IncreaseByAction {
  readonly type = AppActionTypes.INCREASE_BY;
  constructor(readonly amount: number) {}
}

export type AppAction = IncreaseByAction;
