import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryAtom, todoAtom } from "../../atoms";

const TodoForm = styled.form`
  display: grid;
  grid-template-columns: 9fr 1fr;
  margin-bottom: 36px;
  input {
    border-radius: 8px;
    border-width: 0;
    font-weight: bold;
    font-size: 24px;
    padding: 8px;
    background-color: ${(props) => props.theme.asymColor};
    color: ${(props) => props.theme.bgColor};
    &:focus {
      outline: none;
    }
  }
  button {
    border-radius: 8px;
    border-width: 0;
    font-size: 36px;
    border-width: 0;
    margin-left: 12px;
    padding: 4px 12px 4px 12px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    &:hover {
      background-color: ${(props) => props.theme.hoverColor};
      color: ${(props) => props.theme.textColor};
    }
  }
`;

interface IForm {
  toDo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoAtom);
  const category = useRecoilValue(categoryAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>({});
  const onSubmit = ({ toDo }: IForm) => {
    if (category === Categories.ALL) {
      setTodos((current) => [
        { id: Date.now(), text: toDo, category: Categories.TODO },
        ...current,
      ]);
    } else {
      setTodos((current) => [
        { id: Date.now(), text: toDo, category },
        ...current,
      ]);
    }
    setValue("toDo", "");
  };

  return (
    <TodoForm onSubmit={handleSubmit(onSubmit)}>
      <input
        maxLength={30}
        {...register("toDo", {
          required: "todo is empty",
          minLength: 2,
          maxLength: 30,
        })}
        placeholder="Write a todo"
      />
      <button>+</button>
    </TodoForm>
  );
}

export default CreateTodo;
