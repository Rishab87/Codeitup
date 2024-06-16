import React from 'react'

const QuestionPage = ({question}:{question:any}) => {
  return (
    <div className='p-2'>
        <div>
            <p className='font-bold '>{question.title}</p>
            <p>{question.difficulty}</p>
        </div>
    </div>
  )
}

export default QuestionPage