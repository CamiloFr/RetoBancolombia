import { createReducer, on } from '@ngrx/store';
import { UserResponse } from '../../models/user.model';
import { SetLoading, SetUserInformation } from '../actions/app.actions';

export const AppKey = 'app';

export const initialUserInformation: UserResponse = {
  email: '',
  name: '',
  phone: '',
  country: '',
  city: '',
  password: '',
  type: '',
  createdAt: '',
  updatedAt: '',
};

export const AppInitialState: AppReducerState = {
  loading: false,
  token: '',
  userInformation: initialUserInformation,
};

export interface AppReducerState {
  loading: boolean;
  token: string;
  userInformation: UserResponse;
}

export const appReducer = createReducer(
  AppInitialState,
  on(SetUserInformation, (state, { userInformation }) => ({
    ...state,
    userInformation,
  })),
  on(SetLoading, (state, { loading }) => ({
    ...state,
    loading,
  }))
);
