import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export enum Categories {
  "ALL" = "ALL",
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryAtom = atom<Categories>({
  key: "category",
  default: Categories.ALL,
});

export const todoAtom = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoAtom);
    const category = get(categoryAtom);

    if (category === "ALL") {
      return todos;
    } else {
      return todos.filter((todo) => todo.category === category);
    }
  },
});
