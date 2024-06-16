import React from 'react'

const QuestionPage = ({question}:{question:any}) => {
  return (
    <div className='p-2'>
        <div>
            <p>{question.}</p>
        </div>
    </div>
  )
}

export default QuestionPage