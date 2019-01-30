import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Issue} from "../model/issue.model";

@Injectable()
export class IssueService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://pasissue.azurewebsites.net/api/issueapi/issues/';
  //baseUrl: string = 'http://localhost:8000/api/IssueAPI/Issues/';

  getIssues() {
    return this.http.get<Issue[]>(this.baseUrl +  'all');
  }

  getIssueById(id: string) {
    return this.http.get<Issue>(this.baseUrl + id);
  }

  createIssue(issue: Issue) {
    return this.http.post(this.baseUrl + "Create", issue);
  }

  updateIssue(issue: Issue) {
    console.log('Update Issue');
    return this.http.put(this.baseUrl + "Update/" + issue.id, issue);
  }

  deleteIssue(id: string) {
    return this.http.delete(this.baseUrl + "Delete/" + id);
  }
}