import { Component, Input, SimpleChanges } from '@angular/core';
import { Allproducts } from '../core/interfaces/allproducts';

@Component({
  selector: 'app-eyelook',
  templateUrl: './eyelook.component.html',
  styleUrls: ['./eyelook.component.css']
})
export class EyelookComponent {

  @Input() AllproductsInit: Allproducts[] = [];
  @Input() productIndex: number = 0;
  imageSliderEye!: Allproducts;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.imageSliderEye = this.AllproductsInit[this.productIndex];
  }

  stopPro(e: Event): void {
    e.stopPropagation();
  }

  changeMainPic(currentImage: any, change: HTMLImageElement): void {
    let first = change.getAttribute('src');
    let second = currentImage.getAttribute('src');
    currentImage.setAttribute('src', first);
    change.setAttribute('src', second);
  }
}
