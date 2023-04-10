import { Component, Input } from "@angular/core";

import { QuestionWithAuthor } from "../../models/author-question";
import { UserService } from "src/app/auth/services/user/user.service";

@Component({
  selector: "app-question-list-item",
  templateUrl: "./question-list-item.component.html",
  styleUrls: ["./question-list-item.component.css"],
})
export class QuestionListItemComponent {
  @Input("question") authorQuestion!: QuestionWithAuthor;
  user$ = this.userService.currentUser$;

  constructor(private userService: UserService) {}
}
