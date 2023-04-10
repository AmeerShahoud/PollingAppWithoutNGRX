import { Component, OnInit } from "@angular/core";
import { UserService } from "./auth/services/user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "polling-app";

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers();
  }
}
