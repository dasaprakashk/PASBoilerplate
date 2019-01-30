import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  title = 'PAS-UI';
  isNavbarCollapsed=true;

  navRegistration(): void {
    this.router.navigate(['registration']);
  };

  navSubmission(): void {
    this.router.navigate(['submission']);
  };

  navQuote(): void {
    this.router.navigate(['quote']);
  };

  navIssue(): void {
    this.router.navigate(['issue']);
  };
}
