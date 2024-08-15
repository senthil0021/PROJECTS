import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;
  

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isAuthenticated().subscribe(
      (status) => {
        this.isAuthenticated = status;
      }
    );
  }
  
 

  onSearch() {
    if (this.isAuthenticated) {
      this.router.navigate(['/products']);
    } else {
      alert('You need to be logged in to search products.');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
