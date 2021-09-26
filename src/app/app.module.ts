import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OutletsComponent } from './tmr/outlets/outlets.component';
import { OutletComponent } from './tmr/outlet/outlet.component';
import { MapComponent } from './tmr/map/map.component';
import { TmrHomeComponent } from './tmr/tmr-home/tmr-home.component';

import { SideNavComponent } from './bdr/side-nav/side-nav.component';
import { HomeComponent } from './bdr/home/home.component';
import { DashboardComponent } from './bdr/dashboard/dashboard.component';
import { MyRouteComponent } from './bdr/my-route/my-route.component';
import { DailyScheduleComponent } from './bdr/daily-schedule/daily-schedule.component';
import { PocComponent } from './bdr/poc/poc.component';
import { AmOnlineComponent } from './bdr/am-online/am-online.component';


import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetupPasswordComponent } from "./setup-password/setup-password.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CameraComponent } from './camera/camera.component';
import { OpportuntyComponent } from './opportunty/opportunty.component';
import { SurveyComponent } from './survey/survey.component';
import { from } from 'rxjs';
import { GeneralHomeComponent } from './general-home/general-home.component';
import { SummaryComponent } from './bdr/summary/summary.component';
import { SearchComponent } from './bdr/search/search.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DownloadComponent } from './download/download.component';
import { DailySummaryComponent } from './daily-summary/daily-summary.component';
import { ChillerComponent } from './task/chiller/chiller.component';
import { TrophyLagerComponent } from './task/trophy-lager/trophy-lager.component';
import { TrophyStoutComponent } from './task/trophy-stout/trophy-stout.component';
import { GatewayComponent } from './gateway/gateway.component';
import { StatisticalSummaryComponent } from './statistical-summary/statistical-summary.component';
import { VisualizerComponent } from './task/visualizer/visualizer.component';
import { TestCamComponent } from './test-cam/test-cam.component';

import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { FeedbackComponent } from './task/feedback/feedback.component';
import { NotifyComponent } from './notify/notify.component';
import { IndexComponent } from './charts/index/index.component';
import { GeneralComponent } from './charts/general/general.component';
import { ChartsModule } from 'ng2-charts';
import { BdrRankingComponent } from './charts/bdr-ranking/bdr-ranking.component';
import { BdrPerWeekComponent } from './charts/bdr-per-week/bdr-per-week.component';
import { SkuAvailabilityComponent } from './charts/sku-availability/sku-availability.component';
import { AvailabilitySegmentComponent } from './charts/availability-segment/availability-segment.component';
import { BdrRankingPageComponent } from './charts/bdr-ranking-page/bdr-ranking-page.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { SuperAdminPageComponent } from './super-admin-page/super-admin-page.component';
import { HeroComponent } from './task/hero/hero.component';
import { DataExcelComponent } from './data-excel/data-excel.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    OutletsComponent,
    OutletComponent,
    SideNavComponent,
    TmrHomeComponent,
    MapComponent,
    
    SideNavComponent,
    DashboardComponent,
    MyRouteComponent,
    DailyScheduleComponent,
    PocComponent,
    AmOnlineComponent,
    HomeComponent,
    
    CameraComponent,
    NavBarComponent,
    ResetPasswordComponent,
    OpportuntyComponent,
    SurveyComponent,
    SetupPasswordComponent,
    GeneralHomeComponent,
    SummaryComponent,
    SearchComponent,
    AdminComponent,
    AdminLoginComponent,
    DownloadComponent,
    DailySummaryComponent,
    ChillerComponent,
    TrophyLagerComponent,
    TrophyStoutComponent,
    GatewayComponent,
    StatisticalSummaryComponent,
    VisualizerComponent,
    TestCamComponent,
    FeedbackComponent,
    NotifyComponent,
    IndexComponent,
    GeneralComponent,
    BdrRankingComponent,
    BdrPerWeekComponent,
    SkuAvailabilityComponent,
    AvailabilitySegmentComponent,
    BdrRankingPageComponent,
    SuperAdminPageComponent,
    HeroComponent,
    DataExcelComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    MatExpansionModule, 
    MatDividerModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule, 
    HttpClientModule, 
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [NgxImageCompressService,
    { provide:
      MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
