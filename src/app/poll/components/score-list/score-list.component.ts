import { Component } from "@angular/core";
import { UserService } from "src/app/auth/services/user/user.service";

@Component({
  selector: "app-score-list",
  templateUrl: "./score-list.component.html",
  styleUrls: ["./score-list.component.scss"],
})
export class ScoreListComponent {
  scoreList$ = this.userService.usersScores$;
  constructor(private userService: UserService) {}
}
