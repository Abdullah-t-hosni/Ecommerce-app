import { Component } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {


  scrollToTop(): void {
    scrollTo({ top: 0, behavior: 'smooth' });
  }

}
