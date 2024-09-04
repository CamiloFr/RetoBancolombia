import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store";
import { selectLoading, selectToken, selectUserInformation } from "./selectors/app.selector";
import { SetLoading, SetUserInformation } from "./actions/app.actions";
import { UserResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class SharedFacade {
    appLoading$;
    appToken$;
    appUserInformation$;

    constructor(private store: Store<AppState>) {
        // selectors
        this.appLoading$ = this.store.select(selectLoading);
        this.appToken$ = this.store.select(selectToken);
        this.appUserInformation$ = this.store.select(selectUserInformation);
    }

    // dispatchers
    setUserInformation(userInformation: UserResponse) {
        this.store.dispatch(SetUserInformation({ userInformation }));
    }

    setLoading(loading: boolean) {
        this.store.dispatch(SetLoading({ loading }));
    }

}