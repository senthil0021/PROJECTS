import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgFor,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products:any[]=[];
  private isAuthenticated=true;

  constructor(private router: Router, private authService: AuthService)
  {

  }
  ngOnInit(): void {
      this.authService.getProducts().subscribe(
       (data:any[])=>
       {
          this.products=data;
       },
       (err)=>
       {
         console.log("Error in fetching the data",err);
       }
      )
     
  }
  onSearch() {
    if (this.isAuthenticated) {
      this.router.navigate(['/products']);
    } else {
      alert('You need to be logged in to search products.');
      this.router.navigate(['/login']);
    }
  }
  
}