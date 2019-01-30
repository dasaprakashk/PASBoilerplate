import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {Router} from "@angular/router";
import {Registration} from "../model/registration.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {

  registration: Registration;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private registrationService: RegistrationService) { }

  ngOnInit() {
    let regId = localStorage.getItem("editregistrationId");
    if(!regId) {
      alert("Invalid action.")
      this.router.navigate(['registration']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      producercode: ['', Validators.required],
      producername: ['', Validators.required],
      produceremail: ['', Validators.required],
      accountname: ['', Validators.required],
      isComplete: false
    });
    this.registrationService.getRegistrationById(regId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.registrationService.updateRegistration(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['registration']);
        },
        error => {
          alert(error);
        });
  }

}
