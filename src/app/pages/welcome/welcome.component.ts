import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [FooterComponent]
})
export class WelcomeComponent implements OnInit {
products: any;

  constructor() { }

  ngOnInit() { }

}
