import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@radix-ui/react-scroll-area'

const QuestionPage = ({question}:{question:any}) => {

    if(!question){
        return (
            <Skeleton className='h-[80vh] w-full'/>
        )
    }

    //add image tag in eg ho skta hai kisi question me image ho
  return (
        <div className='p-2 flex flex-col gap-5 overflow-x-hidden h-[90vh] overflow-scroll pb-12'>

            <div>
                <p className='font-bold text-2xl'>{question.title}</p>
                <p className={`${question.difficulty === "easy"? "text-green-500 bg-green-200":question.difficulty === "medium"? "text-yellow-500 bg-yellow-200": "text-red-500 bg-red-200"} font-semibold text-lg w-[80px] rounded-lg p-1 text-center mt-1 h-[35px]`}>{question.difficulty}</p>
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

            <Separator/>    
            <div className='text-gray-500'>
                <p className='font-semibold'>Constraints</p>
                <div className='flex flex-col gap-2'>
                    {
                        question.constraints.map((constraint:any , index:number)=>(
                            <p key={index}>{constraint}</p>
                        ))
                    }
                </div>
            </div>

            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-gray-500'>Topics</AccordionTrigger>
                        <AccordionContent>
                        <div className='flex gap-2'>
                        {
                            question.tags.map((tag:any)=>(
                                <span key={tag.id} className='text-gray-100 bg-gray-500 rounded-md p-1'>{tag.name}</span>
                            ))
                        }
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
  )
}

export default QuestionPage