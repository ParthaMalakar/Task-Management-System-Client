import React, { useState } from 'react';

const Alltasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', deadline: '2023-01-01', priority: 'High' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', deadline: '2023-02-01', priority: 'Moderate' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', deadline: '2023-03-01', priority: 'Low' }
  ]);

  const renderTasks = (container, taskList) => {
    return taskList.map(task => (
      <div key={task.id} className="task" draggable="true" data-id={task.id}>
        <strong>{task.title}</strong>
        <p>{task.description}</p>
        <p>Deadline: {task.deadline}</p>
        <p>Priority: {task.priority}</p>
      </div>
    ));
  };

  const addDragDropListeners = (container) => {
    container.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
      e.target.classList.add('dragging');
    });

    container.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const dragOverElement = getDragOverElement(container, e.clientY);
      const draggingElement = document.querySelector('.dragging');

      if (dragOverElement === null) {
        container.appendChild(draggingElement);
      } else {
        container.insertBefore(draggingElement, dragOverElement);
      }
    });
  };

  const getDragOverElement = (container, y) => {
    const elements = [...container.querySelectorAll('.task:not(.dragging)')];
    return elements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  };

  return (
    <div className="task-container">
      <div id="todo-list" className="task-list">
        <h2>To-Do</h2>
        {renderTasks(document.getElementById('todo-list'), tasks)}
      </div>
      <div id="ongoing-list" className="task-list">
        <h2>Ongoing</h2>
        {renderTasks(document.getElementById('ongoing-list'), [])}
      </div>
      <div id="completed-list" className="task-list">
        <h2>Completed</h2>
        {renderTasks(document.getElementById('completed-list'), [])}
      </div>
    </div>
  );
};

export default Alltasks;
