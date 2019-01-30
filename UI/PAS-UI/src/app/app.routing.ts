import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRegistrationComponent } from './list-registration/list-registration.component';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { ListSubmissionComponent } from './list-submission/list-submission.component';
import { AddSubmissionComponent } from './add-submission/add-submission.component';
import { EditSubmissionComponent } from './edit-submission/edit-submission.component';
import { ListQuoteComponent } from './list-quote/list-quote.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ViewSubmissionComponent } from './view-submission/view-submission.component';
import { ViewQuoteComponent } from './view-quote/view-quote.component';

const routes: Routes = [
  { path: 'registration', component: ListRegistrationComponent },
  { path: 'add-registration', component: AddRegistrationComponent },
  { path: 'edit-registration', component: EditRegistrationComponent },
  { path: 'submission', component: ListSubmissionComponent },
  { path: 'add-submission', component: AddSubmissionComponent },
  { path: 'edit-submission', component: EditSubmissionComponent },
  { path: 'quote', component: ListQuoteComponent },
  { path: 'add-quote', component: AddQuoteComponent },
  { path: 'issue', component: ListIssueComponent },
  { path: 'add-issue', component: AddIssueComponent },
  { path: 'view-submission', component: ViewSubmissionComponent },
  { path: 'view-quote', component: ViewQuoteComponent },
  { path : '', component : ListRegistrationComponent}
];

export const routing = RouterModule.forRoot(routes);
