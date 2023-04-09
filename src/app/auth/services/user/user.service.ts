import { Injectable } from "@angular/core";
import { BehaviorSubject, from, map } from "rxjs";
import { User } from "../../models/user";
import * as db from "../../../db/_DATA.js";
import { UserUtilsService } from "./user-utils.service";

export type UsersData = { [userId: string]: User };

export interface UserState {
  isLoading: boolean;
  currentUser: User | null;
  allUsers: User[];
  error: string | null;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _userState: UserState = {
    isLoading: false,
    currentUser: null,
    allUsers: [],
    error: null,
  };

  private _userStateSubject = new BehaviorSubject<UserState>({
    ...this._userState,
  });

  get isLoading$() {
    return this._userStateSubject.pipe(map((state) => state.isLoading));
  }

  get currentUser$() {
    return this._userStateSubject.pipe(map((state) => state.currentUser));
  }

  get allUsers$() {
    return this._userStateSubject.pipe(map((state) => state.allUsers));
  }

  get error$() {
    return this._userStateSubject.pipe(map((state) => state.error));
  }

  constructor(private userUtils: UserUtilsService) {}

  getUserById(id: string) {
    return from<Promise<UsersData>>(db._getUsers()).pipe(
      map((users) => users[id])
    );
  }

  getAllUsers() {
    return from<Promise<UsersData>>(db._getUsers()).pipe(
      map((users) => {
        let _users: User[] = [];
        for (let id in users) _users.push(users[id]);
        return _users;
      })
    );
  }

  setCurrentUser(user: User | null) {
    this._upadateUserState({ currentUser: user });
  }

  createNewUser(firstName: string, lastName: string, avatarUrl: string) {
    const { id: _userId, userData: _userData } = this.userUtils.formatUserData(
      firstName,
      lastName,
      avatarUrl
    );

    return from<Promise<UsersData>>(db._addUser(_userData)).pipe(
      map((userData) => userData[_userId])
    );
  }

  updatedUsersPollData = () => {
    this._upadateUserState({ isLoading: true });
    return this.getAllUsers();
  };

  private _upadateUserState(newState: Partial<UserState>) {
    this._userState = {
      ...this._userState,
      currentUser:
        newState.currentUser === undefined
          ? this._userState.currentUser
          : newState.currentUser,
      allUsers:
        newState.allUsers === undefined
          ? this._userState.allUsers
          : newState.allUsers,
      isLoading:
        newState.isLoading === undefined
          ? this._userState.isLoading
          : newState.isLoading,
      error:
        newState.error === undefined ? this._userState.error : newState.error,
    };
    this._userStateSubject.next({ ...this._userState });
  }
}
