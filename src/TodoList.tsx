// import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

function TodoList() {
  const { register, watch } = useForm();

  return (
    <div>
      <form>
        <input {...register("todo")} placeholder="Write a todo" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
