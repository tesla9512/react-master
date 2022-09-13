import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryAtom, todoSelector } from "../../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const Container = styled.div`
  height: 100vh;
  padding: 0px 20px;
  max-width: 720px;
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

const CategoryBtn = styled.button<{ isActive: boolean }>`
  border-radius: 12px;
  border-width: 0px;
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
  padding: 4px 8px 4px 8px;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.asymColor};
  color: ${(props) => props.theme.windowColor};
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

function TodoList() {
  const categorizedTodo = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const onInput = (event: React.FormEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <Header>
        <Title>TODO LIST</Title>
      </Header>
      <CreateTodo />
      <CategoryBtn
        isActive={category === Categories.All}
        onClick={onInput}
        value={Categories.All}
      >
        {Categories.All}
      </CategoryBtn>
      <CategoryBtn
        isActive={category === Categories["To Do"]}
        onClick={onInput}
        value={Categories["To Do"]}
      >
        {Categories["To Do"]}
      </CategoryBtn>
      <CategoryBtn
        isActive={category === Categories.Doing}
        onClick={onInput}
        value={Categories.Doing}
      >
        {Categories.Doing}
      </CategoryBtn>
      <CategoryBtn
        isActive={category === Categories.Done}
        onClick={onInput}
        value={Categories.Done}
      >
        {Categories.Done}
      </CategoryBtn>
      <Todolist>
        {categorizedTodo.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </Todolist>
    </Container>
  );
}

export default TodoList;
