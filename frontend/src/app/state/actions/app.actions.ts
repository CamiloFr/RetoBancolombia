import { createAction, props } from '@ngrx/store';
import { UserResponse } from '../../models/user.model';

// Types for the actions
export enum AppActionTypes {
  SetUser = 'Set User Information',
  SetLoading = 'Set Loading',
}

export const SetUserInformation = createAction(
  AppActionTypes.SetUser,
  props<{ userInformation: UserResponse }>()
);

export const SetLoading = createAction(
  AppActionTypes.SetLoading,
  props<{ loading: boolean }>()
);
