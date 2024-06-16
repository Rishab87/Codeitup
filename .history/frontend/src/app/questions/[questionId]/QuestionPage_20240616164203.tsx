import React from 'react'

const QuestionPage = ({question}:{question:any}) => {

    if(!question)
  return (
    <div className='p-2'>
        <div>
            <p className='font-bold text-2xl'>{question.title}</p>
            <p>{question.difficulty}</p>
        </div>
    </div>
  )
}

export default QuestionPage