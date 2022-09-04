import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryAtom, todoSelector } from "../../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const Todolist = styled.ul``;

function TodoList() {
  const categorizedTodo = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <Header>
        <Title>TODO LIST</Title>
      </Header>
      <CreateTodo />
      <select value={category} onInput={onInput}>
        <option value={Categories.ALL}>ALL</option>
        <option value={Categories.TODO}>TODO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <Todolist>
        {categorizedTodo.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </Todolist>
    </Container>
  );
}

export default TodoList;
