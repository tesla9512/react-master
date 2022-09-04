import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Categories, ITodo, todoAtom } from "../../atoms";

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
  grid-template-columns: 2fr 12fr 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
  justify-content: center;
  label {
    color: ${(props) => props.theme.accentColor};
  }
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
const TodoDel = styled.button`
  vertical-align: center;
  font-size: 16px;
  border-radius: 4px;
  border-width: 0;
  /* padding: 2px 0px 4px 0px; */
  margin-left: 4px;
  background-color: ${(props) => props.theme.windowColor};
  &:hover {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;

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

  const onDelete = () => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <TodoItem>
      <label>{category}</label>
      <span>{text}</span>
      {category !== Categories.TODO && (
        <TodoCategory name={Categories.TODO + ""} onClick={onClick}>
          TODO
        </TodoCategory>
      )}
      {category !== Categories.DOING && (
        <TodoCategory name={Categories.DOING + ""} onClick={onClick}>
          DOING
        </TodoCategory>
      )}
      {category !== Categories.DONE && (
        <TodoCategory name={Categories.DONE + ""} onClick={onClick}>
          DONE
        </TodoCategory>
      )}
      <TodoDel onClick={onDelete}>❌</TodoDel>
    </TodoItem>
  );
}

export default Todo;
