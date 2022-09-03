import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoAtom, todoSelector } from "../../atoms";
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
  const todos = useRecoilValue(todoAtom);
  const [toDo, doing, done] = useRecoilValue(todoSelector);

  return (
    <Container>
      <Header>
        <Title>TODO LIST</Title>
      </Header>
      <CreateTodo />
      <Todolist>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </Todolist>
    </Container>
  );
}

export default TodoList;
