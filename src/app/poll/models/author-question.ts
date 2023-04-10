import { User } from "src/app/auth/models/user";
import { Question } from "./question";

export interface QuestionWithAuthor {
  author: User;
  question: Question;
}
