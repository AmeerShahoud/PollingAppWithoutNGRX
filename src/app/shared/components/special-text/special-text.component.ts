import { Component, Input } from "@angular/core";

@Component({
  selector: "app-special-text",
  templateUrl: "./special-text.component.html",
  styleUrls: ["./special-text.component.css"],
})
export class SpecialTextComponent {
  @Input("text") text!: string;
}
