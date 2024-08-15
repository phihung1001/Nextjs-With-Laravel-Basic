
"use client"; // This is a client component 👈🏽

import { describe } from 'node:test';
import React, { useState,ChangeEvent,MouseEvent } from 'react'
import axios from 'axios';

export default function Page() {
   const [tasks, setTasks] = useState({
       title: "",
       description:"",
       completed: false
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTasks(({
      ...tasks,
      [e.target.name]: e.target.checked
    }));
  };

   const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        setTasks({
            ...tasks,
            [e.target.name]: e.target.value
        });
        console.log('NewTask', tasks);
   }

   const onChangeSubmit = async(e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
        const res = await axios.post("http://todo-app-nextjs.test/auth/create",tasks);
        console.log('res',res);
        window.location.href ='/';
    } catch(err) {
        console.log('ERROR');
    }
   }
    return (
    <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Task</h1>
        <div>
            <form>
              <div className="mb-5">
                <label htmlFor="title" className='block text-sm font-medium text-white-900'> Title </label>
                <input type="text" name='title' id='title' className='input input-bordered input-primary w-full max-w-xs'
                placeholder='Title..'
                onChange={e => handleSubmit(e)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="description" className='block text-sm font-medium text-white-900'> Description </label>
                <input type="text" name='description' id='description' className='input input-bordered input-primary w-full max-w-xs'
                placeholder='description..'
                onChange={e => handleSubmit(e)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="completed" className='block text-sm font-medium text-white-900'> Completed  :   
                <input
                         id="completed" 
                         type="checkbox"
                         name="completed"
                         checked={tasks.completed}
                         onChange={handleChange}
                />
                </label>
              </div>
              <button type='submit' className='btn btn-primary' onClick={e => onChangeSubmit(e)}> Add Task</button>
            </form>
        </div>
    </div>
    )
}
