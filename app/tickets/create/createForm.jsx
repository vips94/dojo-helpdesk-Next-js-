'use client'

import React,{useState} from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();
  const[isLoading, setIsLoading] = useState(false);

  const[title, setTitle] = useState("");
  const[body, setBody] = useState("");
  const[priority, setPriority] = useState("low");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const ticket = {
        title, body, priority, user_email: 'vip@gmail.com'
    }

    const res = await fetch('http://localhost:4000/tickets',{
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(ticket)
    })

    if(res.status === 201){
        router.refresh();
        router.push('/tickets');
    }
  }
  

  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="w-1/2">
      <label>
        <span>Title:</span>
        <input required type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
      </label>
      <label>
        <span>Body:</span>
        <textarea required name="body" value={body} onChange={(e)=>{setBody(e.target.value)}}/>
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority" value={priority} onChange={(e)=>{setPriority(e.target.value)}}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button disabled={isLoading} className='btn-primary'>
        {isLoading && <span>Submitting...</span>}
        {!isLoading && <span>Submit</span>}
      </button>
    </form>
  )
}