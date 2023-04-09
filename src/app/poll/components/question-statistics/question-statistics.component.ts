import { Component, Input } from "@angular/core";
import { User } from "src/app/auth/models/user";
import { Question } from "../../models/question";
import { AuthorQuestion } from "../../models/author-question";

@Component({
  selector: "app-question-statistics",
  templateUrl: "./question-statistics.component.html",
  styleUrls: ["./question-statistics.component.css"],
})
export class QuestionStatisticsComponent {
  @Input("user") user!: User | null;
  @Input("question") authorQuestion!: AuthorQuestion;

  get userAnswer() {
    return this.user?.answers[this.authorQuestion.question.id];
  }

  get secondAnswer(): "optionOne" | "optionTwo" {
    return this.userAnswer === "optionOne" ? "optionTwo" : "optionOne";
  }
}
