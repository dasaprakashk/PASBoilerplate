import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {routing} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { ListRegistrationComponent } from './list-registration/list-registration.component';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import {RegistrationService} from "./service/registration.service";
import { ListSubmissionComponent } from './list-submission/list-submission.component';
import { AddSubmissionComponent } from './add-submission/add-submission.component';
import { EditSubmissionComponent } from './edit-submission/edit-submission.component';
import { SubmissionService } from './service/submission.service';
import { ListQuoteComponent } from './list-quote/list-quote.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { QuoteService } from './service/quote.service';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { IssueService } from './service/issue.service';
import { ViewSubmissionComponent } from './view-submission/view-submission.component';
import { ViewQuoteComponent } from './view-quote/view-quote.component';


@NgModule({
  declarations: [
    AppComponent,
    ListRegistrationComponent,
    AddRegistrationComponent,
    EditRegistrationComponent,
    ListSubmissionComponent,
    AddSubmissionComponent,
    EditSubmissionComponent,
    ListQuoteComponent,
    AddQuoteComponent,
    ListIssueComponent,
    AddIssueComponent,
    ViewSubmissionComponent,
    ViewQuoteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule
  ],
  providers: [RegistrationService, SubmissionService, QuoteService, IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
