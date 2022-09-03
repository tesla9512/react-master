import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export interface ITodo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

export const todoAtom = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoAtom);
    return [
      todos.filter((todo) => todo.category === "TODO"),
      todos.filter((todo) => todo.category === "DOING"),
      todos.filter((todo) => todo.category === "DONE"),
    ];
  },
});
