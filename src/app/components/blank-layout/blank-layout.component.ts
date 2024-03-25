import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {


  isButtonVisible: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.pageYOffset || document.documentElement.scrollTop;
    const showPosition = 200;

    if (yOffset < showPosition) {
      this.isButtonVisible = false;
    } else {
      this.isButtonVisible = true;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
