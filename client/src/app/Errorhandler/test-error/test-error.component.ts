import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
   baseUrl = 'https://localhost:7001/imatcherapi/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseUrl + 'error/not-found').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }

   get400Error() {
    this.http.get(this.baseUrl + 'error/bad-request').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }

   get500Error() {
    this.http.get(this.baseUrl + 'error/server-error').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  get401Error() {
    this.http.get(this.baseUrl + 'error/auth').subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/signup', {}).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
