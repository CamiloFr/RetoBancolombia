import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppKey, AppReducerState } from "../reducers/app.reducer";

const selectFeature = createFeatureSelector<AppReducerState>(AppKey);

export const selectLoading = createSelector(selectFeature, (state: AppReducerState) => state.loading);

export const selectToken = createSelector(selectFeature, (state: AppReducerState) => state.token);

export const selectUserInformation = createSelector(selectFeature, (state: AppReducerState) => state.userInformation);