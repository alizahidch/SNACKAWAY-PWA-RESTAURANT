import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {AngularFireStorageModule} from '@angular/fire/storage'


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EntryComponent } from './auth/entry/entry.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from "./shared/services/auth.service";


import { ToastrModule } from 'ngx-toastr';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFireMessagingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxMaterialTimepickerModule,
    ComponentsModule,
    RouterModule,
    ServiceWorkerModule.register('combined-sw.js', {
      enabled: environment.production,
    }),
    AngularFireStorageModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAIva5Ww6N4-Q_KfT0njg9gM2rDArTGtsU',
      libraries: ['geometry', 'places']
    }),
    MatGoogleMapsAutocompleteModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    EntryComponent,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
