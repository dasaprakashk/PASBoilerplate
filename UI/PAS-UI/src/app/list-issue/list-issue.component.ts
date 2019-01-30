import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {IssueService} from "../service/issue.service";
import {QuoteService} from "../service/quote.service";
import {RegistrationService} from "../service/registration.service";
import {Issue} from "../model/issue.model";

@Component({
  selector: 'app-list-issue',
  templateUrl: './list-issue.component.html',
  styleUrls: ['./list-issue.component.css']
})
export class ListIssueComponent implements OnInit {

  issues : Issue[];
  quotes: any[] = [];
  registrations: any[] = [];

  constructor(private router: Router, private registrationService:RegistrationService, private quoteService:QuoteService, private issueService: IssueService) { }

  ngOnInit() {
    this.registrationService.getRegistrations()
      .subscribe( reg => {
        console.log(reg);
        this.registrations = reg;
        localStorage.setItem('registrations', JSON.stringify(this.registrations));
    });
    this.quoteService.getQuotes()
      .subscribe( q => {
        this.quotes = q;
        localStorage.setItem('quotes', JSON.stringify(this.quotes));
    });
    this.issueService.getIssues()
      .subscribe( data => {
        console.log(data);
        this.issues = data;
        this.registrations = JSON.parse(localStorage.getItem("registrations"));
        this.quotes = JSON.parse(localStorage.getItem("quotes"));
        this.issues.forEach(obj => {
          console.log(this.registrations);
          obj.accountid = this.registrations.find(x => x.id === obj.accountid).accountname;
          obj.quoteid = this.quotes.find(x => x.id === obj.quoteid).quoteamount;
          console.log(obj.accountid);
          console.log(obj.quoteid);
        });
      });
  }

  addIssue(): void {
    this.router.navigate(['add-issue']);
  };

}
