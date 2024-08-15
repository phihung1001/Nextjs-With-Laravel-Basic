"use client"; // This is a client component 👈🏽

import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }
export default function Tasks() {
    const [data, setData] = useState<Task[]>([]); 
    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async() => {
        try {
          const response = await axios.get("http://todo-app-nextjs.test/auth/get-all");
          const dat = response.data;
          console.log('data',data);
          setData(dat); // Cập nhật state
        } catch(err) {
            console.log('ERROR');
        }
    }
    const handleDelete = async(id: number) => {
        try {
            const res = await axios.post(`http://todo-app-nextjs.test/auth/delete/${id}`);
            console.log('Delete', res);
            const newData = data.filter((item) => {
                return ( item.id !==id)
            })
            setData(newData);
        } catch(err) {
            console.log('ERROR');
        }
    }
    return (
        <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Completed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                        {data.map((task, index) => (
                        <tr key={task.id}>
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.completed ? 'Yes' : 'No'}</td>
                            <td>
                            <Link href={`/view/${task.id}`} className="btn btn-info">View</Link>
                            <Link href={`/edit/${task.id}`} className="btn btn-primary">Edit</Link>
                            <button onClick={()=> handleDelete(task.id) }className="btn btn-secondary">Delete</button>
                            </td>
                        </tr>
                        ))}
              </tbody>
        </table>
    );
}