import { Injectable } from "@angular/core";
import { UsersData } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserUtilsService {
  constructor() {}

  formatUserData(firstName: string, lastName: string, avatarUrl: string) {
    let _userId =
      (firstName + lastName).toLowerCase() +
      "-" +
      Math.random().toString(36).substring(2, 6);
    let _user: UsersData = {
      [_userId]: {
        id: _userId,
        name: `${firstName} ${lastName}`,
        avatarURL: avatarUrl,
        questions: [],
        answers: {},
      },
    };

    return { id: _userId, userData: _user };
  }
}
