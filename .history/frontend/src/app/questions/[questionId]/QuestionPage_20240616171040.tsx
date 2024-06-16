import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const QuestionPage = ({question}:{question:any}) => {

    if(!question){
        return (
            <Skeleton className='h-[80vh] w-full'/>
        )
    }

    //add image tag in eg ho skta hai kisi question me image ho
  return (
    <div className='p-2 flex flex-col gap-5 w-full'>
        <div>
            <p className='font-bold text-2xl'>{question.title}</p>
            <p className={`${question.difficulty === "easy"? "text-green-500 bg-green-200":question.difficulty === "medium"? "text-yellow-500 bg-yellow-200": "text-red-500 bg-red-200"} font-semibold text-lg w-[70px] rounded-lg p-1 text-center mt-1 h-[35px]`}>{question.difficulty}</p>
        </div>

        <div>
            <p className='font-semibold'>{question.description}</p>   
        </div>

        <div className='text-gray-500'>
            {
                question.examples.map((example:any , index:number)=>(
                    <div key={index} className='flex flex-col gap-3'>
                        <p className='font-semibold'>Example {index+1}</p>
                        <div className='flex flex-col gap-1'>
                            <div>
                                <p className='font-semibold'>Input</p>
                                <p>{example.input}</p>
                            </div>
                            <div className='mb-3'>
                                <p className='font-semibold'>Output</p>
                                <p>{example.output}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className='text-gray-500'>Topics</AccordionTrigger>
                    
                    {
                        question.tags.map((tag:any)=>(
                            <AccordionContent key={tag.id}>{tag.name}</AccordionContent>
                        ))
                    }
                </AccordionItem>
            </Accordion>
        </div>
    </div>
  )
}

export default QuestionPage