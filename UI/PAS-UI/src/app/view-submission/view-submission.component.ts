import { Component, OnInit } from '@angular/core';
import {SubmissionService} from "../service/submission.service";
import {Router} from "@angular/router";
import {Submission} from "../model/submission.model";

@Component({
  selector: 'app-view-submission',
  templateUrl: './view-submission.component.html',
  styleUrls: ['./view-submission.component.css']
})
export class ViewSubmissionComponent implements OnInit {

  submission: Submission;
  submissions : any[] = [];
  registrations : any[] = [];

  constructor(private router: Router, private submissionService: SubmissionService) { }

  ngOnInit() {
    let subId = localStorage.getItem("editsubmissionId");
    console.log(subId);
    if(!subId) {
      alert("Invalid action.")
      this.router.navigate(['submission']);
      return;
    }
    this.submissionService.getSubmissionById(subId)
      .subscribe( data => {
        this.submission = data;
        this.registrations = JSON.parse(localStorage.getItem("registrations"));
        this.submission.accountid = this.registrations.find(x => x.id === this.submission.accountid).accountname;
      });
  }

  generateQuote()
  {
    this.router.navigate(['add-quote']);
  }
}
