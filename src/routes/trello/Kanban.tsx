import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
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

const Trash = styled.div`
  position: absolute;
  left: 90%;
  top: 90%;
  font-size: 72px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

interface IDraggingSnapshot {
  isDraggingOver: boolean;
}

const Can = styled.ul<IDraggingSnapshot>`
  padding: 5px 6px 5px 10px;
  border-radius: 10px;
  max-width: 66px;
  max-height: 82px;
  background-color: ${(props) =>
    props.isDraggingOver ? props.theme.asymColor : props.theme.windowColor};
  color: ${(props) =>
    props.isDraggingOver ? props.theme.windowColor : props.theme.textColor};
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
    } else if (destination?.droppableId === "trash") {
      setToDos((currentBoard) => {
        const orderedBoard = [...currentBoard[source.droppableId]];
        orderedBoard.splice(source.index, 1);
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
      <Trash>
        <Droppable droppableId="trash">
          {(provided, snapshot) => (
            <Can
              isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              🗑
              {provided.placeholder}
            </Can>
          )}
        </Droppable>
      </Trash>
    </DragDropContext>
  );
}

export default Kanban;
