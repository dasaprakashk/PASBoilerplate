import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Registration} from "../model/registration.model";

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://pasregistration.azurewebsites.net/api/registrationapi/registrations/';
  //baseUrl: string = 'http://localhost:8000/api/RegistrationAPI/Registrations/';

  getRegistrations() {
    return this.http.get<Registration[]>(this.baseUrl +  'all');
  }

  getRegistrationById(id: string) {
    return this.http.get<Registration>(this.baseUrl + id);
  }

  createRegistration(registration: Registration) {
    return this.http.post(this.baseUrl + "Create", registration);
  }

  updateRegistration(registration: Registration) {
    console.log('Update Registration');
    return this.http.put(this.baseUrl + "Update/" + registration.id, registration);
  }

  deleteRegistration(id: string) {
    return this.http.delete(this.baseUrl + "Delete/" + id);
  }
}