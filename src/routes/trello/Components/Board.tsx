import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoS, toDoState } from "../../../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.windowColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
`;

interface IDraggingSnapshot {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}

const Area = styled.div<IDraggingSnapshot>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.boardColorTo
      : props.isDraggingFrom
      ? props.theme.boardColorFrom
      : props.theme.boardColorBase};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: ITodoS[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((current) => {
      return {
        ...current,
        [boardId]: [...current[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>

      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>

      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Board);
