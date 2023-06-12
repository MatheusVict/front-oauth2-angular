import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { LoginUser } from './login-user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front_oauth2';
  public user: LoginUser = this.getDefaultUser()

  constructor(private readonly route: ActivatedRoute, private readonly http: HttpClient) {
    const {id} = this.route.snapshot.queryParams;
    console.log(id)
    this.route.queryParamMap.subscribe((param: ParamMap) => {
      const  id = param.get('id')
      if(id) console.log(id)
    })
  }

  public loginGoogle(id: string): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${id}` });

    this.http
    .post('http://localhost:4000/auth/google/login', {}, {headers})
    .subscribe({
      next: (res: LoginUser) => {
        this.user = {...res};
      },
      error: (err: HttpErrorResponse) => {},
    })
  }

  private getDefaultUser(): LoginUser {
    return {
      email: '',
      firstName: '',
      lastName: '',
      picture: '',
      accessToken: ''
    }
  }
}
