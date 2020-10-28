import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selectedType = 'select'
  constructor( private router: Router) { }

  async ngOnInit() { }

  async login() {
    if(this.selectedType != 'select' && this.selectedType == 'Recruiter'){
      localStorage.setItem('currentUserType',this.selectedType);
      this.router.navigate(['/home'], {replaceUrl: true})
    }else if (this.selectedType != 'select' && this.selectedType == 'Candidate'){
      localStorage.setItem('currentUserType',this.selectedType);
      this.router.navigate(['/candidate'], {replaceUrl: true})
    }
    else{
      alert("please select and then login")
    }
  }

  async login2(event) {
    this.selectedType = event.target.value;
      // alert("please select and then login"+this.selectedType)
    
  }
}