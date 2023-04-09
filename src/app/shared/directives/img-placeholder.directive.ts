import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";

@Directive({
  selector: "[appImgPlaceholder]",
})
export class ImgPlaceholderDirective implements OnInit {
  private imgElement: HTMLImageElement;

  @Input("placeholderSrc") imgSrc = "/assets/avatars/placeholder.png";
  @HostListener("error") putPlaceholderImage() {
    this.imgElement.src = this.imgSrc;
  }

  constructor(elementRef: ElementRef) {
    this.imgElement = elementRef.nativeElement as HTMLImageElement;
  }

  ngOnInit() {
    this.imgElement.src = this.imgElement.src
      ? this.imgElement.src
      : this.imgSrc;
  }
}
