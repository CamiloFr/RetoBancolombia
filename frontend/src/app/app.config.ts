import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { principalRoutes } from './app.routes';
import { homeAdminRoutes } from './screens/home-admin/routes/home-admin.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storeMetaReducers } from './state/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(principalRoutes),
    provideRouter(homeAdminRoutes),
    provideStore(storeMetaReducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
