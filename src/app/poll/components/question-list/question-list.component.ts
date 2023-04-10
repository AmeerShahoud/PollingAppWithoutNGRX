import { Component, Input } from "@angular/core";
import { QuestionWithAuthor } from "../../models/author-question";

@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.css"],
})
export class QuestionListComponent {
  @Input("questions") authorQuestions: QuestionWithAuthor[] = [];
  @Input("isAnsweredQuestions") isAnsweredQuestions?: boolean;
}
