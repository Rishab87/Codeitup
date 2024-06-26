import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { IoClose } from "react-icons/io5";

const SkillsInput = ({skills , setSkills}:{skills: string[] , setSkills: Function}) => {

    const [skill , setSkill] = useState<string>('');

    function skillListHandler(event:any){
        if(skill && (event.key === ',' || event.key === "Enter")){
            if(skills.length === 10){
                toast("Max 10 skills allowed");
                setSkill("");
                return;
            }

            event.preventDefault();
            setSkills([...skills , skill]);
            setSkill("");
        }
    }

    function removeTag(index:number){
        const updatedSkillList = [...skills];
        updatedSkillList.splice(index , 1);
        setSkills(updatedSkillList);
    }

  return (
    <div className='flex flex-col gap-y-2'>
    <label htmlFor="tags" className='font-mono text-lg'>Skills: {skills.length}/10</label>
    {   skills.length>0 &&(
        <div className='flex gap-2 flex-wrap'>
            {skills.map((skill , index)=>(
                <div key={index} className='bg-gray-900 dark:bg-gray-50 text-white dark:text-black rounded-full w-fit h-fit p-2 flex gap-1 items-center text-xs justify-center font-semibold font-mono'>
                    {skill}
                    <div className='w-fit h-fit' onClick={()=>removeTag(index)}>
                        <IoClose className='w-[20px] h-[20px] dark:text-zinc-950 text-zinc-100'/>
                    </div>
                </div>
            ))}
        </div>
    )
    }
    {/*The onKeyDown event is typically triggered first because it is part of the initial sequence of keyboard events that occur when a key is pressed */}
    <Textarea id="skills" cols={50} rows={5} value={skill} onKeyDown={skillListHandler} onChange={(e)=> setSkill(e.target.value)} placeholder='Enter skills , press enter or comma to add' className='mt-2'/>
</div>
  )
}

export default SkillsInput