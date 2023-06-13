import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]',
})
export class CustomDirectiveDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.addClass(this.elementRef.nativeElement, 'hovered');
    this.elementRef.nativeElement.style.opacity = 0.5;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'hovered');
    this.elementRef.nativeElement.style.opacity = 1;
  }
}
