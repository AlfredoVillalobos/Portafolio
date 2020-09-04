import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss']
})
export class AboutmeComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public web: string;
  constructor() { 
    this.title = "Alfredo Villalobos";
    this.subtitle = "Desarrollador";
    this.web = "a_web.com"
  }

  ngOnInit() {
  }

}
