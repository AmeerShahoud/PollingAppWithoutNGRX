import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as PollSelectors from "../../state/selectors/poll.selectors";
import { AuthorQuestion } from "../../models/author-question";
import { Subject, takeUntil } from "rxjs";
import { QuestionService } from "../../services/question/question.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  answeredQuestions!: AuthorQuestion[];
  unAnsweredQuestions!: AuthorQuestion[];
  isLoading$ = this.store.select(PollSelectors.selectIsLoading);

  private destroySubscribtions = new Subject();

  get answeredQuestionsCount() {
    return `Answered Questions - (${this.answeredQuestions.length})`;
  }

  get unAnsweredQuestionsCount() {
    return `Unanswered Questions - (${this.unAnsweredQuestions.length})`;
  }

  constructor(private store: Store, private questionService: QuestionService) {}

  ngOnInit(): void {
    this.store
      .select(PollSelectors.selectAnsweredQuestions)
      .pipe(takeUntil(this.destroySubscribtions))
      .subscribe((questions) => {
        this.answeredQuestions = questions;
      });
    this.store
      .select(PollSelectors.selectUnAnsweredQuestions)
      .pipe(takeUntil(this.destroySubscribtions))
      .subscribe((questions) => {
        this.unAnsweredQuestions = questions;
      });
  }

  ngOnDestroy(): void {
    this.destroySubscribtions.complete();
  }
}
