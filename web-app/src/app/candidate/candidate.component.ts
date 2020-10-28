import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { FormBuilder, FormGroup, Validators, EmailValidator, FormControl } from '@angular/forms';
import * as UploadModel from './../UploadModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  selectedTab: Number;
  applied: Array<any>;
  jobs: Array<any>;
  currentUserType:string;
  public uploadForm: FormGroup;
  uploadModel: UploadModel.UploadModel = {};

  constructor(
    private apiClient: ApiClientService,
    private router: Router
  ) {
    this.selectedTab = 0;
    this.applied = [];
    this.jobs = [];
  }

  ngOnInit() {
    this.currentUserType = localStorage.getItem('currentUserType');
    // alert(this.currentUserType)
    this.apiClient.getjobs().then((res) =>{
      this.jobs = res;
    }, (error) => {
      console.log(error.message)
    });
  }

  async apply(job) {
    this.apiClient.applyJob(job).then((res) =>{
      this.jobs = res;
    }, (error) => {
      console.log(error.message)
    });
  }

  async logOut() {
    localStorage.removeItem('currentUserType');
    this.router.navigate([''], {replaceUrl: true})
    localStorage.clear();
  }

  onSearch = (event) => {
    const target = event.target;
    alert(target.value)
    if (!target.value || target.length < 1) { return; }
    if (event.which !== 13) { return; }
    this.apiClient.getjob(target.value).then((res) =>{
      this.jobs = [];
      this.jobs.push(res)
    }, (error) => {
      console.log(error.message)
    });
  }
}
