import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { FormBuilder, FormGroup, Validators, EmailValidator, FormControl } from '@angular/forms';
import * as UploadModel from './../UploadModel';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  selectedTab: Number;
  repos: Array<any>;
  jobs: Array<any>;
  currentUserType:string;
  public uploadForm: FormGroup;
  uploadModel: UploadModel.UploadModel = {};

  constructor(
    private apiClient: ApiClientService,
    private formBuilder: FormBuilder,private router: Router
  ) {
    this.selectedTab = 0;
    this.repos = [];
    this.jobs = [];

    this.uploadForm = this.formBuilder.group({
      companyName: [null],
      title: [null],
      jobType: [null, Validators.compose([Validators.required])],
      salary: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      experience: [null],
      location: [null, Validators.compose([Validators.required])],
      skills: [null],
      noticePeriod: [null],
      contact: [null],
      responsibilities: [null, Validators.compose([Validators.required, Validators.maxLength(105)])]
    });
  }

  async ngOnInit() {
    this.currentUserType = localStorage.getItem('currentUserType');
    // alert(this.currentUserType)
    this.apiClient.getjobs().then((res) =>{
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

  // onJob(event, repo) {
  //   event.preventDefault();
  //   this.updateBackend(repo);
  // }

  updateState(repo) {
    // if (this.isJob(repo)) {
    //   this.jobs = this.jobs.filter( r => r['id'] !== repo.id );
    // } else {
    //   this.jobs = [repo, ...this.jobs];
    // }
  }

  delete(repo) {
    this.apiClient.deletejob(repo).then((res) =>{
      this.jobs = res;
    }, (error) => {
      console.log(error.message)
    });
    // return this.jobs.find( r => r['id'] === repo.id );
  }

  updateBackend = (repo) => {
    // if (this.isJob(repo)) {
    //   this.apiClient.deleteJob(repo);
    // } else {
    //   this.apiClient.createJob(repo);
    // }
    this.updateState(repo);
  }

  uploadPostData(){
    this.uploadModel.companyName = this.uploadForm.value.companyName
    this.uploadModel.title = this.uploadForm.value.title
    this.uploadModel.jobType = this.uploadForm.value.jobType
    this.uploadModel.salary = this.uploadForm.value.salary
    this.uploadModel.description = this.uploadForm.value.description
    this.uploadModel.experience = this.uploadForm.value.experience
    this.uploadModel.location = this.uploadForm.value.location
    this.uploadModel.skills = this.uploadForm.value.skills
    this.uploadModel.noticePeriod = this.uploadForm.value.noticePeriod
    this.uploadModel.contact = this.uploadForm.value.contact
    this.uploadModel.responsibilities = this.uploadForm.value.responsibilities
    this.uploadModel.userEmailId = "recruiter@abc.in"
    // this.uploadModel.candidates = ["candidate@abc.in"]
    this.uploadModel.candidates = ''
    this.uploadModel.applyFlag = false

    const jsonString = JSON.stringify(this.uploadModel);
    this.apiClient.createjob(jsonString).then(res => {
      this.uploadForm.reset();
      this.apiClient.getjobs().then((res) =>{
      this.jobs = res;
    }
      // this.toastrMsgService.success('upload Data Successfully', 'Congratulations');
    }, (error) => {
      console.log(error.status)
      const credentialsError = error.status;
      // this.toastrMsgService.error('Sorry Something goes wrong', error.status);
      switch (credentialsError) {
        case 503:
          var errorstatus = 'Internal Server Error';
          break;
        case 400:
          errorstatus = 'Internal Server Error';
          break;
        case 408:
          errorstatus = 'Request TimeOut';
          break;
        case 429:
          errorstatus = 'Too Many Requests';
          break;
        // *** Already Registered User *** //
        case 401:
          errorstatus = 'Already Exists';
          break;
      }
    });
  }

  showNotification(from, align, message, timer, type, icon) {
  //   $.notify(
  //     {
  //       icon: icon,
  //       message: message
  //     },
  //     {
  //       type: type,
  //       timer: timer,
  //       placement: {
  //         from: from,
  //         align: align
  //       }
  //     }
  //   );
  }

}
