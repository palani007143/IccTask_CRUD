import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  constructor(private http: HttpClient) {
  }

  createjob(repo) {
    return this.perform('post', '/jobs/', repo);
  }

  deletejob(repo) {
    return this.perform('delete', `/job/${repo.id}`);
  }

  applyJob(repo) {
    return this.perform('post', `/jobs/${repo.id}`, repo);
  }

  getjobs() {
    return this.perform('get', '/jobs');
  }

  getjob(id) {
    return this.perform('get', `/job/${id}`);
  }

  async perform(method, resource, data = {}) {
    // const accessToken = await this.oktaAuth.getAccessToken();
    const url = `http://localhost:8000${resource}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`
      })
    };

    switch (method) {
      case 'delete':
        return this.http.delete(url, httpOptions).toPromise();
      case 'get':
        return this.http.get(url, httpOptions).toPromise();
      default:
        return this.http[method](url, data, httpOptions).toPromise();
    }
  }
}