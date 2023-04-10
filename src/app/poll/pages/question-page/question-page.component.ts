import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, combineLatest, takeUntil } from "rxjs";

import { User } from "src/app/auth/models/user";
import { UserService } from "src/app/auth/services/user/user.service";
import { QuestionService } from "../../services/question/question.service";
@Component({
  selector: "app-question-page",
  templateUrl: "./question-page.component.html",
  styleUrls: ["./question-page.component.css"],
})
export class QuestionPageComponent implements OnInit, OnDestroy {
  isLoading = false;
  error$ = this.questionService.error$;

  selectedQuestionWithAuthor$ =
    this.questionService.selectedQuestionWithAuthor$;
  IsSelectedQuestionAnswered$ =
    this.questionService.isSelectedQuestionAnswered$;

  user!: User | null;

  private destroySubscriptions = new Subject();

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((params) => {
        const _questionId = params.get("id")!;
        this.questionService.selectQuestion(_questionId);
      });

    combineLatest([
      this.userService.isLoading$,
      this.questionService.isLoading$,
    ])
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe(
        (isLoading) => (this.isLoading = isLoading[0] || isLoading[1])
      );
    this.userService.currentUser$
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    this.destroySubscriptions.complete();
  }
}
