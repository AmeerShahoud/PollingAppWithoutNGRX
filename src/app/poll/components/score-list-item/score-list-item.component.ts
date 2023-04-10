import { Component, Input } from "@angular/core";
import { UserService } from "src/app/auth/services/user/user.service";
import { UserScore } from "../../models/user-score";

@Component({
  selector: "app-score-list-item",
  templateUrl: "./score-list-item.component.html",
  styleUrls: ["./score-list-item.component.scss"],
})
export class ScoreListItemComponent {
  @Input("userScore") userScore!: UserScore;
  @Input("ranking") ranking!: number | null;

  user$ = this.userService.currentUser$;

  constructor(private userService: UserService) {}
}
