import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../service/registration.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.css']
})
export class AddRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private registrationService: RegistrationService) { }

  addForm: FormGroup;


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      producercode: ['', Validators.required],
      producername: ['', Validators.required],
      produceremail: ['', Validators.required],
      accountname: ['', Validators.required],
      isComplete: false
    });
  }

  onSubmit() {
    this.registrationService.createRegistration(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['registration']);
      });
  }
}
