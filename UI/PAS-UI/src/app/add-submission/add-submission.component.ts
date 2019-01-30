import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubmissionService} from "../service/submission.service";
import { RegistrationService } from '../service/registration.service';
import { Registration } from '../model/registration.model';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { Submission } from '../model/submission.model';


@Component({
  selector: 'app-add-submission',
  templateUrl: './add-submission.component.html',
  styleUrls: ['./add-submission.component.css']
})
export class AddSubmissionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private registrationService: RegistrationService, private submissionService: SubmissionService) { }

  addForm: FormGroup;
  registrations : Registration[]
  submission: Submission;

  ngOnInit() {

    this.registrationService.getRegistrations()
      .subscribe( data => {
        console.log(data);
        this.registrations = data;
      });

    this.addForm = this.formBuilder.group({
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
  }

  onSubmit() {
    console.log(this.addForm.value);
    this.submissionService.createSubmission(this.addForm.value)
      .subscribe( (data:Submission) => {
        localStorage.removeItem("editsubmissionId");
        localStorage.setItem("editsubmissionId", data.id);
        this.router.navigate(['view-submission']);
      });
  }
}
