import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UploadModule } from './modules/upload/upload.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LogInComponent } from './modules/login/log-in.component';
import { LogInModule } from './modules/login/log-in.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { PlaylistModule } from './modules/playlist/playlist.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UploadModule,
    LogInModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    PlaylistModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
