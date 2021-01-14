import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appIonicInput]'
})
export class IonicInputDirective {
  @Input('appIonicInput') myStyles: any;

  constructor() { }

  @HostListener('mouseover') onMouseOver() {
    this.myStyles.showUsername = true;
  }

  @HostListener('mouseout') onMouseOut() {
    this.myStyles.showUsername = false;
  }

  @HostListener('keydown', ['$event'])onInput(e: any) {
    if ('~!@#$%^&*()-='.includes(e.key)) {
      e.preventDefault();
      return;
    }
  }

}
