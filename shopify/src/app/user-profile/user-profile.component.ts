import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.http.get(`${environment.apiUrl}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      }).subscribe(
        (data) => this.user = data,
        (err) => console.error(err)
      );
    }
  }
}