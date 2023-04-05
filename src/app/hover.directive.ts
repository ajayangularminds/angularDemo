import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective implements OnInit{

 @Input() color:string = 'red';

  constructor(private element: ElementRef, private renderer: Renderer2) { 
    console.log(element.nativeElement)
  }

  ngOnInit():void {
      this.element.nativeElement.style.backgroundColor = 'black';
      this.element.nativeElement.style.color = 'white';
      this.renderer.setStyle(this.element.nativeElement,'backgroundColor',this.color);
    }

    @HostListener('mouseenter') onMouseEnter(){
      this.renderer.setStyle(this.element.nativeElement,'backgroundColor','Green');
    }
    @HostListener('mouseleave') onMouseLeave(){
      this.renderer.setStyle(this.element.nativeElement,'backgroundColor',this.color);
    }
}
