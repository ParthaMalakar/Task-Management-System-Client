import React, { useContext } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { AuthContext } from "../../provider/Authprovider";
import  DraggableTask  from "./DraggableTask"; // Assuming you have a separate file for DraggableTask

const Alltasks = () => {
  const { user } = useContext(AuthContext);

  const { data: tasks = [], refetch: refetchTasks } = useQuery({
    queryKey: ['task'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/task/${user.email}`);
      return res.data;
    },
  });

  const { data: ongoing = [], refetch: refetchOngoing } = useQuery({
    queryKey: ['taskgo'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/taskgo/${user.email}`);
      return res.data;
    },
  });

  const { data: completetask = [], refetch: refetchComplete } = useQuery({
    queryKey: ['taskcom'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/taskcom/${user.email}`);
      return res.data;
    },
  });

  const moveTask = async (fromIndex, toIndex, sourceStatus, destinationStatus) => {
    const draggedTask = sourceStatus[fromIndex];
    console.log('jjjjjjjj',fromIndex, toIndex, sourceStatus, destinationStatus)
    const updatedSource = [...sourceStatus];
    updatedSource.splice(fromIndex, 1);
    if(destinationStatus[0].status == "ongoing"){
      const dataof={
        status :'ongoing'
    }
    const menuRes = await axios.patch(`http://localhost:5000/tasks/${fromIndex}`, dataof);
    refetchOngoing();
    refetchTasks();
    refetchComplete();

    console.log(menuRes)
    }
    if(destinationStatus[0].status == "ToDo"){
      const dataof={
        status :'ToDo'
    }
    const menuRes = await axios.patch(`http://localhost:5000/tasks/${fromIndex}`, dataof);
    refetchOngoing();
    refetchTasks();
    refetchComplete();

    console.log(menuRes)
    }
    if(destinationStatus[0].status == "complete"){
      const dataof={
        status :'complete'
    }
    const menuRes = await axios.patch(`http://localhost:5000/tasks/${fromIndex}`, dataof);
    refetchOngoing();
    refetchTasks();
    refetchComplete();
    console.log(menuRes)
    }
    const updatedDestination = [...destinationStatus];
    updatedDestination.splice(toIndex, 0, draggedTask);

    const updateTasks = async (newTasks, queryKey) => {
      // Update the tasks on the server
      // ...

      // Invalidate and refetch the query to update the UI
      // await QueryClient.invalidateQueries(queryKey);
    };

    await updateTasks(updatedSource, 'task');
    await updateTasks(updatedDestination, 'taskgo');
    await updateTasks(updatedDestination, 'taskcom');

  };
  return (
    <div>
      <div className="bg-slate-300">
        <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">All ToDO Tasks</h2>
          <h2 className="text-3xl">Total ToDo Tasks: {tasks.length}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Task Title</th>
                <th>Description</th>
                <th>Deadlines</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {tasks?.map((task, index) => (
                <DraggableTask
                  key={task._id}
                  task={task}
                  index={index}
                  id={task._id}
                  moveTask={(fromIndex, toIndex, source, destination) =>
                    moveTask(fromIndex, toIndex, source, destination)
                  }
                  sourceStatus={tasks}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-stone-400">
      <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">All onGoing Tasks</h2>
          <h2 className="text-3xl">Total onGoing Tasks: {ongoing.length}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Task Title</th>
                <th>Description</th>
                <th>Deadlines</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {ongoing?.map((task, index) => (
                <DraggableTask
                  key={task._id}
                  task={task}
                  index={index}
                  id={task._id}

                  moveTask={(fromIndex, toIndex, source, destination) =>
                    moveTask(fromIndex, toIndex, source, destination)
                  }
                  sourceStatus={ongoing}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-orange-200">
      <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">All Complete Tasks</h2>
          <h2 className="text-3xl">Total Complete Tasks: {completetask.length}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Task Title</th>
                <th>Description</th>
                <th>Deadlines</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {completetask?.map((task, index) => (
                <DraggableTask
                  key={task._id}
                  task={task}
                  index={index}
                  id={task._id}

                  moveTask={(fromIndex, toIndex, source, destination) =>
                    moveTask(fromIndex, toIndex, source, destination)
                  }
                  sourceStatus={completetask}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alltasks;
