import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { ITodo, todoAtom } from "../../atoms";

// const Category = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   align-items: center;
//   text-align: center;
//   justify-content: center;

//   button {
//     height: 24px;
//     margin: 0 4px 0 4px;
//     border-radius: 6px;
//     border-width: 0;
//     text-transform: uppercase;
//   }
// `;

// const Todolist = styled.ul``;

const TodoItem = styled.li`
  background-color: ${(props) => props.theme.windowColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  margin: 10px 0 10px 0;
  padding: 12px;
  font-size: 24px;
  font-weight: bold;
  display: grid;
  grid-template-columns: 10fr 1fr 1fr;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const TodoCategory = styled.button`
  width: 60px;
  border-radius: 6px;
  border-width: 0;
  padding: 4px 8px 4px 8px;
  margin: 0 4px 0 4px;
  &:hover {
    color: ${(props) => props.theme.windowColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;
// const TodoDel = styled.button`
//   width: 32px;
//   vertical-align: center;
//   font-size: 20px;
//   border-radius: 4px;
//   border-width: 0;
//   padding: 2px 0px 4px 0px;
//   font-weight: bold;
//   &:hover {
//     color: ${(props) => props.theme.textColor};
//     background-color: ${(props) => props.theme.accentColor};
//   }
// `;

function Todo({ text, category, id }: ITodo) {
  const setTodos = useSetRecoilState(todoAtom);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setTodos((current) => {
      const targetIndex = current.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };

      return [
        ...current.slice(0, targetIndex),
        newTodo,
        ...current.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <TodoItem>
      <span>{text}</span>
      {category !== "TODO" && (
        <TodoCategory name="TODO" onClick={onClick}>
          TODO
        </TodoCategory>
      )}
      {category !== "DOING" && (
        <TodoCategory name="DOING" onClick={onClick}>
          DOING
        </TodoCategory>
      )}
      {category !== "DONE" && (
        <TodoCategory name="DONE" onClick={onClick}>
          DONE
        </TodoCategory>
      )}
    </TodoItem>
  );
}

export default Todo;
