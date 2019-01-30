import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Quote} from "../model/quote.model";

@Injectable()
export class QuoteService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://pasquote.azurewebsites.net/api/quoteapi/quotes/';
  //baseUrl: string = 'http://localhost:8000/api/QuoteAPI/Quotes/';

  getQuotes() {
    return this.http.get<Quote[]>(this.baseUrl +  'all');
  }

  getQuoteById(id: string) {
    return this.http.get<Quote>(this.baseUrl + id);
  }

  createQuote(quote: Quote) {
    return this.http.post(this.baseUrl + "Create", quote);
  }

  updateQuote(quote: Quote) {
    console.log('Update Quote');
    return this.http.put(this.baseUrl + "Update/" + quote.id, quote);
  }

  deleteQuote(id: string) {
    return this.http.delete(this.baseUrl + "Delete/" + id);
  }
}