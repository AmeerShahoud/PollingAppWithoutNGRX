import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { authGuard } from "../auth/guards/auth.guard";
import { QuestionPageComponent } from "./pages/question-page/question-page.component";
import { LeaderBoardPageComponent } from "./pages/leader-board-page/leader-board-page.component";
import { NewQuestionPageComponent } from "./pages/new-question-page/new-question-page.component";

const routes: Routes = [
  { path: "home", component: HomePageComponent, canActivate: [authGuard] },
  {
    path: "questions/:id",
    component: QuestionPageComponent,
    canActivate: [authGuard],
  },
  {
    path: "leaderboard",
    component: LeaderBoardPageComponent,
    canActivate: [authGuard],
  },
  {
    path: "add",
    component: NewQuestionPageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollRoutingModule {}
