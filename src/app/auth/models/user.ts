export interface User {
  id: string;
  name: string;
  avatarURL: string;
  answers: { [questionsId: string]: "optionOne" | "optionTwo" };
  questions: string[];
}
