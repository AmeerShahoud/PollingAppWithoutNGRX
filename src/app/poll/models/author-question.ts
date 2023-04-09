import { User } from "src/app/auth/models/user";
import { Question } from "./question";

export interface AuthorQuestion {
  author: User;
  question: Question;
}
