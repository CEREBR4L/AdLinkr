import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './partials/header/header.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: CampaignsComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'campaigns', component: CampaignsComponent },
  { path: 'users', component: UsersComponent},
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: CampaignsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CampaignsComponent,
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
