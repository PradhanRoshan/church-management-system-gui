import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.css']
})
export class FooterBarComponent {

  currentYear = new Date().getFullYear();
  desinedBy = "Rosahn Pradhan"

}
