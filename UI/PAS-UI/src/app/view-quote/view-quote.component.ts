import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuoteService} from "../service/quote.service";
import { RegistrationService } from '../service/registration.service';
import {SubmissionService} from "../service/submission.service";
import {Router} from "@angular/router";
import { Submission } from '../model/submission.model';
import { Quote } from '../model/quote.model';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css']
})
export class ViewQuoteComponent implements OnInit {

  quote: Quote;
  submission: Submission;
  quotes : any[] = [];
  registrations : any[] = [];

  constructor(private router: Router, private quoteService: QuoteService, private submissionService: SubmissionService) { }

  ngOnInit() {
    let quoteId = localStorage.getItem("editquoteId");
    console.log(quoteId);
    if(!quoteId) {
      alert("Invalid action.")
      this.router.navigate(['submission']);
      return;
    }
    this.quoteService.getQuoteById(quoteId)
      .subscribe( data => {
        this.quote = data;
        console.log('Submission Id');
        console.log(data.submissionid);
        this.submissionService.getSubmissionById(data.submissionid)
        .subscribe(sub =>{
          this.registrations = JSON.parse(localStorage.getItem("registrations"));
          this.quote.submissionid = this.registrations.find(x => x.id === sub.accountid).accountname;
        });
      });
  }

  generateIssue()
  {
    this.router.navigate(['add-issue']);
  }

  listSubmission()
  {
    this.router.navigate(['submission']);
  }
}
