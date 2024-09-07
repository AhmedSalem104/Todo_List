import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr,  } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingpageInterceptor } from './Core/interceptors/Loading/loadingpage.interceptor';
import { errorInterceptor } from './Core/interceptors/error/error.interceptor';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(withFetch(),withInterceptors([loadingpageInterceptor,errorInterceptor])),
  provideAnimations(),
  provideToastr(),
  importProvidersFrom(NgxSpinnerModule)
  ]
};
