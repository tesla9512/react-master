import React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function Kanban() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return; //이게 없으면 destination은 undefined 이슈로 고통받는다

    //same board movement
    if (destination?.droppableId === source.droppableId) {
      setToDos((currentBoard) => {
        const orderedBoard = [...currentBoard[source.droppableId]];
        const dragObj = orderedBoard[source.index];
        orderedBoard.splice(source.index, 1);
        orderedBoard.splice(destination?.index, 0, dragObj);
        return { ...currentBoard, [source.droppableId]: orderedBoard };
      });
    } else {
      setToDos((currentBoard) => {
        const targetBoard = [...currentBoard[destination?.droppableId]];
        const sourceBoard = [...currentBoard[source.droppableId]];
        const dragObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, dragObj);

        return {
          ...currentBoard,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: targetBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default Kanban;
