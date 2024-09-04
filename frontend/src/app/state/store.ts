import { ActionReducerMap } from "@ngrx/store";
import { AppKey, appReducer, AppReducerState } from "./reducers/app.reducer";

export interface AppState {
    [AppKey]: AppReducerState;
}

export const storeMetaReducers: ActionReducerMap<AppState> = {
    [AppKey]: appReducer,
}