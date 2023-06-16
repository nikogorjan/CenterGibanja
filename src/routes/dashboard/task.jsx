import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging }) => (isDragging ? 'lightgreen' : 'white')};
`;

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;