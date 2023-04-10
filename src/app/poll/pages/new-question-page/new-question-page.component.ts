import { Component } from "@angular/core";
import { QuestionService } from "../../services/question/question.service";

@Component({
  selector: "app-new-question-page",
  templateUrl: "./new-question-page.component.html",
  styleUrls: ["./new-question-page.component.scss"],
})
export class NewQuestionPageComponent {
  isLoading$ = this.questionService.isLoading$;

  constructor(private questionService: QuestionService) {}
}
