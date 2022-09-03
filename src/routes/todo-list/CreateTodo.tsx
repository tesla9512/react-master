import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoAtom } from "../../atoms";

const TodoForm = styled.form`
  display: flex;
  margin-bottom: 36px;
  input {
    border-radius: 8px;
    border-width: 0;
    font-weight: bold;
    font-size: 24px;
    width: 400px;
    padding: 8px;
    background-color: ${(props) => props.theme.asymColor};
    color: ${(props) => props.theme.bgColor};
    &:focus {
      outline: none;
    }
  }
  button {
    font-size: 36px;
    border-width: 0;
    margin-left: 12px;
    padding: 4px 8px 4px 8px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
`;

interface IForm {
  toDo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>({});
  const onSubmit = ({ toDo }: IForm) => {
    setTodos((current) => [
      { id: Date.now(), text: toDo, category: "TODO" },
      ...current,
    ]);
    setValue("toDo", "");
  };

  return (
    <TodoForm onSubmit={handleSubmit(onSubmit)}>
      <input
        maxLength={20}
        {...register("toDo", {
          required: "todo is empty",
          minLength: 2,
          maxLength: 20,
        })}
        placeholder="Write a todo"
      />
      <button>+</button>
    </TodoForm>
  );
}

export default CreateTodo;
