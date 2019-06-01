import { STORAGE_NAME } from "Constants";

export const storageService = {
  putLocalStorage(id: string) {
    window.localStorage.setItem(STORAGE_NAME, id);
  },

  getUserId(): string | null {
    return window.localStorage.getItem(STORAGE_NAME);
  },

  checkUser(userData: any, pollId: string): boolean {
    const question = userData.answers.find(
      (answer: any) => answer.questionId === pollId
    );
    return !!question;
  }
};
