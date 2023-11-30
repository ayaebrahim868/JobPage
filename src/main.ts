import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientInterceptor } from './app/common/http-client-interceptor';


bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(BrowserModule, AppRoutingModule),
      provideHttpClient(withInterceptors([HttpClientInterceptor()]))
  ]
})
.catch(err => console.error(err));
