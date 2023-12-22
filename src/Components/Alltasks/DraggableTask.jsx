import React from "react";
import { useDrag, useDrop } from 'react-dnd';

const TYPE = 'TASK';

const DraggableTask = ({ task, index,id, moveTask, sourceStatus }) => {
  const [{ isDragging }, drag] = useDrag({
    type: TYPE,
    item: { id, sourceStatus },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: TYPE,
    hover: (draggedItem) => {
      if (draggedItem.sourceStatus[0]._id !== id && draggedItem.sourceStatus !== sourceStatus) {
        moveTask(draggedItem.sourceStatus[0]._id, id, draggedItem.sourceStatus, sourceStatus);
        draggedItem.index = index;
        draggedItem.sourceStatus = sourceStatus;
      }
    },
  });
  return (
    <tr ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <th>{index + 1}</th>
      <td>{task.title}</td>
      <td>{task.descriptions}</td>
      <td>{task.deadlines}</td>
      <td>{task.status}</td>
      <td>{task.priority}</td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default DraggableTask;
