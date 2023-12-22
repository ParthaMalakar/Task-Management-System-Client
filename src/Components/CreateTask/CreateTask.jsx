import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaAddressBook, FaUtensils } from 'react-icons/fa';
import { AuthContext } from '../../provider/Authprovider';

const CreateTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    console.log(user)
    const onSubmit = async (data) => {
        data.status = "ToDo";
        data.email = user.email;
        reset();
        console.log(data)
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    Swal.fire(
                        'ADD success!',
                        'You clicked the button!',
                        'success'
                      )                }
            })
        
    };
    
    return (
        <div className='bg-cyan-500 pt-10 pb-20'>
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-gray-600 mb-2 text-3xl"><i>---- Create a New task ----</i></p>
            </div>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Task title"
                            {...register('title', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Descriptions</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Descriptions"
                            {...register('descriptions', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Deadlines</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Deadlines"
                            {...register('deadlines', { required: true })}

                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">priority</span>
                        </label>
                        <select  placeholder="priority"
                            {...register('priority', { required: true })}
                            required
                            className="rounded-lg p-3 input-bordered w-full">
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                        </select>
                        
                    </div>

                    <button className="btn text-center w-full ">
                        Add Task <FaAddressBook className="ml-4"></FaAddressBook>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;