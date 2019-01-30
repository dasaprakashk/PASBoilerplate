import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssueService} from "../service/issue.service";
import {QuoteService} from "../service/quote.service";
import {SubmissionService} from "../service/submission.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { Quote } from '../model/quote.model';
import { Submission } from '../model/submission.model';
import { Issue } from '../model/issue.model';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private submissionService:SubmissionService, private quoteService:QuoteService, private issueService: IssueService) { }

  addForm: FormGroup;
  quote: Quote;
  submission: Submission;
  accountid: string;
  producername: string;
  registrations : any[] = [];


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
          this.submission = sub;
          console.log(sub);
          this.registrations = JSON.parse(localStorage.getItem("registrations"));
          this.accountid = sub.accountid;
          this.quote.submissionid = this.registrations.find(x => x.id === sub.accountid).accountname;
          this.producername = this.registrations.find(x => x.id === sub.accountid).producername;
          console.log(this.accountid);
          console.log(this.quote.submissionid);
          console.log(this.producername);
        });
    });
  }

  issuePolicy() {
    var issue: Issue = {id: "", accountid:this.accountid, quoteid:this.quote.id, producername: this.producername};
    console.log(issue);
    this.issueService.createIssue(issue)
      .subscribe( data => {
        this.router.navigate(['issue']);
      });
  }

}
