import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {Registration} from "../model/registration.model";

@Component({
  selector: 'app-list-registration',
  templateUrl: './list-registration.component.html',
  styleUrls: ['./list-registration.component.css']
})
export class ListRegistrationComponent implements OnInit {

  registrations : Registration[]

  constructor(private router: Router, private registrationService: RegistrationService) { }

  ngOnInit() {
    this.registrationService.getRegistrations()
      .subscribe( data => {
        console.log(data);
        this.registrations = data;
      });
  }

  editRegistration(registration: Registration): void {
    localStorage.removeItem("editregistrationId");
    localStorage.setItem("editregistrationId", registration.id);
    this.router.navigate(['edit-registration']);
  };

  addRegistration(): void {
    this.router.navigate(['add-registration']);
  };

}
