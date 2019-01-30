import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Submission} from "../model/submission.model";

@Injectable()
export class SubmissionService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://passubmission.azurewebsites.net/api/submissionapi/submissions/';
  //baseUrl: string = 'http://localhost:8000/api/SubmissionAPI/Submissions/';

  getSubmissions() {
    return this.http.get<Submission[]>(this.baseUrl +  'all');
  }

  getSubmissionById(id: string) {
    return this.http.get<Submission>(this.baseUrl + id);
  }

  createSubmission(submission: Submission) {
    return this.http.post(this.baseUrl + "Create", submission);
  }

  updateSubmission(submission: Submission) {
    console.log('Update Submission');
    return this.http.put(this.baseUrl + "Update/" + submission.id, submission);
  }

  deleteSubmission(id: string) {
    return this.http.delete(this.baseUrl + "Delete/" + id);
  }
}