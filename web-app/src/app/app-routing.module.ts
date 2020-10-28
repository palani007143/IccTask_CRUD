import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidateComponent } from './candidate/candidate.component';
const routes: Routes = [
 { path: '', component: LoginComponent },
 {
   path: 'home',
   component: HomeComponent,
 },
 { path: 'candidate', component: CandidateComponent },
];

@NgModule({
 imports: [
   RouterModule.forRoot(routes),
   HttpClientModule,
 ],
 providers: [
 ],
 exports: [RouterModule]
})
export class AppRoutingModule { }