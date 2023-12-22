import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const TYPE = 'TASK';

const DraggableTask = ({ task, index,id, moveTask, sourceStatus }) => {
    const handleDelete =_id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
    
            
                fetch(`http://localhost:5000/delete/${_id}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire(
                            'Deleted!',
                            'Your Product has been deleted.',
                            'success'
                        )
                    })
                            
                            window.location.reload(true)
                        
                    
    
            }
        })
    }

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
      <Link to={`/update/${task._id}`} className="btn mr-4 btn-primary flex-grow">Update</Link>

        <button onClick={()=>handleDelete(task._id)} className="btn btn-accent">Delete</button>
      </td>
    </tr>
  );
};

export default DraggableTask;
