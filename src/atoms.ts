import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export enum Categories {
  "All" = "All",
  "To Do" = "To Do",
  "Doing" = "Doing",
  "Done" = "Done",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryAtom = atom<Categories>({
  key: "category",
  default: Categories.All,
});

const { persistAtom } = recoilPersist({
  key: "localTodo",
  storage: localStorage,
});

export const todoAtom = atom<ITodo[]>({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoAtom);
    const category = get(categoryAtom);

    if (category === "All") {
      return todos;
    } else {
      return todos.filter((todo) => todo.category === category);
    }
  },
});

export interface ITodoS {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodoS[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
