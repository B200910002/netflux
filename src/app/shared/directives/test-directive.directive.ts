import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTestDirective]',
})
export class TestDirectiveDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    // this.elementRef.nativeElement.style.color = 'red';
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.addClass(this.elementRef.nativeElement, 'hovered');
    this.elementRef.nativeElement.style.backgroundColor = 'gray';
    this.elementRef.nativeElement.style.color = 'white';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'hovered');
    this.elementRef.nativeElement.style.backgroundColor = 'white';
    this.elementRef.nativeElement.style.color = '#373D44';
  }
}
