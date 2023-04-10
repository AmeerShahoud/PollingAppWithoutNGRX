import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { PollRoutingModule } from "./poll-routing.module";

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { AnswerStatisticsComponent } from "./components/answer-statistics/answer-statistics.component";
import { CreateNewQuestionComponent } from "./components/create-new-question/create-new-question.component";
import { QuestionListItemComponent } from "./components/question-list-item/question-list-item.component";
import { QuestionListComponent } from "./components/question-list/question-list.component";
import { QuestionStatisticsComponent } from "./components/question-statistics/question-statistics.component";
import { QuestionVoteComponent } from "./components/question-vote/question-vote.component";
import { ScoreListItemComponent } from "./components/score-list-item/score-list-item.component";
import { ScoreListComponent } from "./components/score-list/score-list.component";
import { LeaderBoardPageComponent } from "./pages/leader-board-page/leader-board-page.component";
import { NewQuestionPageComponent } from "./pages/new-question-page/new-question-page.component";
import { QuestionPageComponent } from "./pages/question-page/question-page.component";

@NgModule({
  declarations: [
    HomePageComponent,
    QuestionListComponent,
    QuestionListItemComponent,
    QuestionPageComponent,
    QuestionVoteComponent,
    QuestionStatisticsComponent,
    AnswerStatisticsComponent,
    LeaderBoardPageComponent,
    ScoreListComponent,
    ScoreListItemComponent,
    NewQuestionPageComponent,
    CreateNewQuestionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    PollRoutingModule,
  ],
})
export class PollModule {}
