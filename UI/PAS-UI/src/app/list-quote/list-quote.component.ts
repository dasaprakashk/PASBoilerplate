import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {QuoteService} from "../service/quote.service";
import {Quote} from "../model/quote.model";

@Component({
  selector: 'app-list-quote',
  templateUrl: './list-quote.component.html',
  styleUrls: ['./list-quote.component.css']
})
export class ListQuoteComponent implements OnInit {

  quotes : Quote[]

  constructor(private router: Router, private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuotes()
      .subscribe( data => {
        console.log(data);
        this.quotes = data;
      });
  }

  addQuote(): void {
    this.router.navigate(['add-quote']);
  };
}
