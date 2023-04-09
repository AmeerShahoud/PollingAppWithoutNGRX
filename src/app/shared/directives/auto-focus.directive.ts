import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appAutoFocus]",
})
export class AutoFocusDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (!this.el.nativeElement["focus"])
      throw new Error("Element does not accept focus!");
    this.el.nativeElement.focus();
  }
}
