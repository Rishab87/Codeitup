"use client"

import { getQuestionsByPage } from '@/apis/apiFunctions/questions';
import Navbar from '@/components/Navbar';
<<<<<<< HEAD
import React, { useEffect  , useState} from 'react'
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/Typed-hooks';
import SearchBar from './SearchBar';
import QuestionsTable from './QuestionTable';
import { setQuestions } from '@/redux-toolkit/slices/questions';
=======
import { useRouter } from 'next/navigation';
import React, { useEffect  , useState} from 'react'
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac

const Page = ({params}:{params:{page:string}}) => {

    const {page} = params;

<<<<<<< HEAD

    const dispatch = useAppDispatch();
=======
    const [questions , setQuestions] = useState([]);
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac

    useEffect(()=>{

      const fetchQuestions = async()=>{
        const questions  = await getQuestionsByPage(page);
        //fetch questions acc to page
<<<<<<< HEAD
        dispatch(setQuestions(questions));
=======
        setQuestions(questions);
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
      } 

      fetchQuestions();

    } , [page]);

<<<<<<< HEAD
    const {tags} = useAppSelector(state=>state.questions);

  return (
    <div className='h-[100vh]'>
          <Navbar/>
          <div className='flex flex-col justify-center items-center'>
          <h1 className='mt-20 md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>Structured Questions</h1>
          <SearchBar tags={tags}/>
          <QuestionsTable/>
=======
    const router = useRouter();
    console.log(questions);
    


  return (
    <div className='h-[100vh]'>
          <Navbar active={2}/>
          <div>
          <h1 className='font-bold p-2'>Problems:</h1>
          { questions &&
            (questions.map((question:any , index)=>(
              <div key={index} className='p-2' onClick={()=> router.push(`/problems/${page}/${question?.id}`)}>
                <h1>{question.title}</h1>
                <p>{question.description}</p>
                <p>{question.difficulty}</p>
              </div>
            )))
          } 
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
          </div>
    </div>

  )
}

export default Page