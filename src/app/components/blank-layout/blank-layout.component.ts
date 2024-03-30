import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {
  isButtonVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffset = window.pageYOffset || document.documentElement.scrollTop;
    const showPosition = 200;

    this.isButtonVisible = yOffset >= showPosition;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
