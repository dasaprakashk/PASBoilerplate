import { Component, OnInit } from '@angular/core';
import {SubmissionService} from "../service/submission.service";
import {Router} from "@angular/router";
import {Submission} from "../model/submission.model";
import { RegistrationService } from '../service/registration.service';
import { Registration } from '../model/registration.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-submission',
  templateUrl: './edit-submission.component.html',
  styleUrls: ['./edit-submission.component.css']
})
export class EditSubmissionComponent implements OnInit {

  submission: Submission;
  registrations : Registration[]
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private registrationService: RegistrationService, private submissionService: SubmissionService) { }

  ngOnInit() {

    this.registrationService.getRegistrations()
      .subscribe( data => {
        console.log(data);
        this.registrations = data;
      });
      
    let subId = localStorage.getItem("editsubmissionId");
    if(!subId) {
      alert("Invalid action.")
      this.router.navigate(['submission']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      accountid: ['', Validators.required],
      inceptiondate: ['', Validators.required],
      expirydate: ['', Validators.required],
      applicantname: ['', Validators.required],
      applicantemail: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required],
      domicilestate: ['', Validators.required],
      wsgusa: ['', Validators.required],
      coverages: ['', Validators.required],
      underwriter: ['', Validators.required],
      natureofops: ['', Validators.required],
      mgcis: ['', Validators.required],
      submissionrecdate: ['', Validators.required],
      isComplete: false
    });
    this.submissionService.getSubmissionById(subId)
      .subscribe( data => {
        console.log(subId);
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    let self = this;
    this.submissionService.updateSubmission(this.editForm.value)
      .pipe(first())
      .subscribe(
        (data: Submission) => {
          this.submission = data;
          localStorage.removeItem("editsubmissionId");
          localStorage.setItem("editsubmissionId", this.submission.id);
          this.router.navigate(['view-submission']);
        },
        error => {
          alert(error);
        });
  }
}
