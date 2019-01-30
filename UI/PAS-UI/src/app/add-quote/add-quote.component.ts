import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuoteService} from "../service/quote.service";
import { RegistrationService } from '../service/registration.service';
import {SubmissionService} from "../service/submission.service";
import {Router} from "@angular/router";
import { Submission } from '../model/submission.model';
import { Quote } from '../model/quote.model';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {

  quote: Quote;
  submission: Submission;
  quotes : any[] = [];
  registrations : any[] = [];

  constructor(private formBuilder: FormBuilder,private router: Router, private registrationService: RegistrationService, private submissionService: SubmissionService, private quoteService: QuoteService) { }

  addForm: FormGroup;
  submissionId: string;

  ngOnInit() {
    var submission: Submission;
    let subId = localStorage.getItem("editsubmissionId");
    console.log(subId);
    this.submissionId = subId;
    if(!subId) {
      alert("Invalid action.")
      this.router.navigate(['submission']);
      return;
    }

    this.addForm = this.formBuilder.group({
      id: [],
      submissionid: subId,
      risktype: ['', Validators.required],
      employeecount: ['', Validators.required],
      limit: ['', Validators.required],
      retention: ['', Validators.required],
      equityrisks: ['', Validators.required],
      tierscore: ['', Validators.required],
      isComplete: false
    });
  }

  onSubmit() {
    console.log(this.addForm.value);
    this.quoteService.createQuote(this.addForm.value)
      .subscribe( (data: Quote) => {
        localStorage.removeItem("editquoteId");
        localStorage.setItem("editquoteId", data.id);
        this.router.navigate(['view-quote']);
      });
  }
}