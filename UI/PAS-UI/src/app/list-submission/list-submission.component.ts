import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionService } from '../service/submission.service';
import { RegistrationService } from '../service/registration.service';
import { Submission } from '../model/submission.model';
import { Registration } from '../model/registration.model';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-list-submission',
  templateUrl: './list-submission.component.html',
  styleUrls: ['./list-submission.component.css']
})
export class ListSubmissionComponent implements OnInit {

  submissions : any[] = [];
  registrations : any[] = [];

  constructor(private router: Router, private registrationService: RegistrationService, 
              private _changeDetectorRef: ChangeDetectorRef, private submissionService: SubmissionService) { }

  ngOnInit() {
    this.registrationService.getRegistrations()
      .subscribe( reg => {
        this.registrations = reg;
        localStorage.setItem('registrations', JSON.stringify(this.registrations));
    });
    this.submissionService.getSubmissions()
      .subscribe( data => {
        this.submissions = data;
        this.registrations = JSON.parse(localStorage.getItem("registrations"));
        this.submissions.forEach(obj => {
          obj.accountid = this.registrations.find(x => x.id === obj.accountid).accountname;
        });
      }); 
  }

  
  editSubmission(submission: Submission): void {
    localStorage.removeItem("editsubmissionId");
    localStorage.setItem("editsubmissionId", submission.id);
    this.router.navigate(['edit-submission']);
  };

  addSubmission(): void {
    this.router.navigate(['add-submission']);
  };

}
