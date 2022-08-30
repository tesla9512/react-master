// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// function TodoList() {
//   const [value, setValue] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setValue(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(value);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={value} onChange={onChange} placeholder="Write a todo" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

interface IFormInput {
  errors: {
    name: string;
    message: string;
  };
  todo: string;
  name: string;
  pass: string;
  passConfirm: string;
  extra: string;
}

function TodoList() {
  const { register, watch, handleSubmit, formState, setError } =
    useForm<IFormInput>({
      defaultValues: {
        todo: "place your first todo",
      },
    });
  const onValid = (data: IFormInput) => {
    if (data.pass !== data.passConfirm) {
      setError(
        "pass",
        { message: "password are not same" },
        { shouldFocus: true }
      );
    }
    //setError("extra", { message: "offline" });
  };

  return (
    <Container>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("name", {
            required: "Name is missing",
            pattern: {
              value: /[a-zA-Z\s]$/,
              message: "Only alphabet character allowed",
            },
            minLength: {
              value: 3,
              message: "Your name is too short",
            },
          })}
          placeholder="Write a name"
        />
        <input
          {...register("todo", { required: true, minLength: 2 })}
          placeholder="Write a todo"
        />
        <input
          {...register("pass", {
            required: true,
            minLength: 4,
            validate: {
              no0000: (value) =>
                value.includes("0000") ? "no 0000 allowed" : true,
            },
          })}
          placeholder="password"
        />
        <input
          {...register("passConfirm", { required: true, minLength: 4 })}
          placeholder="confirm"
        />
        <button>Add</button>
        <span>{formState.errors?.name?.message}</span>
        <span>{formState.errors?.pass?.message}</span>
        <span>{formState.errors?.extra?.message}</span>
      </form>
    </Container>
  );
}

export default TodoList;
