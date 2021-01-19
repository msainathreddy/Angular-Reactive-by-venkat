import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDemoDirective]'
})
export class DemoDirectiveDirective {

  @HostBinding('style.border') border: string;

  @HostListener('mouseover') onMouseOver() {
    this.changeBgcolor('blue');
    this.border = 'solid 20px green';
  }

  @HostListener('click') onClick() {
    window.alert('Host Element clicked')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBgcolor('black');
    this.border = "";
  }     


  constructor(private el: ElementRef, private renderer: Renderer2) {
    //this.changeBgcolor('red');
  }


  changeBgcolor(value: String) {
    this.renderer.setStyle(this.el.nativeElement, 'color', value)
  }
}



