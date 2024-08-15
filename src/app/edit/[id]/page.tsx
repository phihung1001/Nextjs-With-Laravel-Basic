"use client"; // This is a client component 👈🏽
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect, ChangeEvent,MouseEvent } from "react";

export default function EditTaskPage() {
  const {id} = useParams();
  const [tasks, setTasks] = useState({
    title: "",
    description:"",
    completed: false
});

  console.log(id);
  useEffect(() => {
      fetchTask();
  },[id]);

  const fetchTask= async() => {
     try {
         const res =await axios.get("http://todo-app-nextjs.test/auth/gettask/"+id);
         console.log('res.data',res.data)
         setTasks(res.data)
     } catch(err) {
        console.log('ERROR');
     }
  }
  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    setTasks(({
      ...tasks,
      [e.target.name]: e.target.checked
    }));
  };
  
  const handleSubmit = (e:  ChangeEvent<HTMLInputElement>) => {
    setTasks({
        ...tasks,
        [e.target.name]: e.target.value
    });
    console.log('NewTask', tasks);
   }

    const onChangeSubmit = async(e : MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
        const res = await axios.post(`http://todo-app-nextjs.test/auth/update/${id}`,tasks);
        console.log('res',res);
        window.location.href ='/';
    } catch(err) {
        console.log('ERROR');
    }
    }
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <h1 className="text-4xl  text-center mb-2 font-bold"> Edit Task {id} </h1>
        <form>
  
              <div className="mb-5">
                <label htmlFor="title" className='block text-sm font-medium text-white-900'> Title </label>
                <input type="text" name='title' id='title' className='input input-bordered input-primary w-full max-w-xs'
                placeholder='Title..'
                onChange={e => handleSubmit(e)}
                value={tasks.title}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="description" className='block text-sm font-medium text-white-900'> Description </label>
                <input type="text" name='description' id='description' className='input input-bordered input-primary w-full max-w-xs'
                placeholder='description..'
                onChange={e => handleSubmit(e)}
                value={tasks.description}
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
              <button type='submit' className='btn btn-primary' onClick={e => onChangeSubmit(e)}> Update Task</button>
            </form>
    </div>
  );
}