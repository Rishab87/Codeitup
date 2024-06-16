import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const QuestionPage = ({question}:{question:any}) => {

    if(!question){
        return (
            <Skeleton className='h-[80vh] w-full'/>
        )
    }
  return (
    <div className='p-2'>
        <div>
            <p className='font-bold text-2xl'>{question.title}</p>
            <p className={`${question.difficulty === "easy"? "text-green-500 bg-green-200":question.difficulty === "medium"? "text-yellow-500 bg-yellow-200": "text-red-500 bg-red-200"} font-semibold text-lg w-[100px] rounded-md p-2`}>{question.difficulty}</p>
        </div>
    </div>
  )
}

export default QuestionPage