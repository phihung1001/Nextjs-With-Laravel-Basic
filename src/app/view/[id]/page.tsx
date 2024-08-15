"use client"; // This is a client component 👈🏽
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}
export default function ViewPage() {
  const {id} = useParams();
  const [task, setTask] = useState<Task>({
    id: '',
    title: "",
    description: "",
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
         setTask(res.data)
     } catch(err) {
        console.log('ERROR');
     }
  }
  return (
    <div className="max-w-2xl mx-auto mt-5">
        <h1 className="text-4xl font-bold items-center justify-between"> View Task </h1>
        <table className="table table-zebra">
          <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                  </tr>
          </thead>
          <tbody>
        
                        <tr>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.completed ? 'Yes' : 'No'}</td>
                        </tr>
              </tbody>

        </table>
    </div>
  );
}