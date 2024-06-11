"use client"

import { getQuestionsByPage } from '@/apis/apiFunctions/questions';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React, { useEffect  , useState} from 'react'

const Page = ({params}:{params:{page:string}}) => {

    const {page} = params;

    const [questions , setQuestions] = useState([]);

    useEffect(()=>{

      const fetchQuestions = async()=>{
        const questions  = await getQuestionsByPage(page);
        //fetch questions acc to page
        setQuestions(questions);
      } 

      fetchQuestions();

    } , [page]);

    const router = useRouter();
    console.log(questions);
    


  return (
    <div className='bg-black h-[100vh]'>
          <Navbar/>
          <div>
          <h1 className='font-bold text-white p-2'>Problems:</h1>
          { questions &&
            (questions.map((question:any , index)=>(
              <div key={index} className='text-white p-2' onClick={()=> router.push(`/problems/${page}/${question?.id}`)}>
                <h1>{question.title}</h1>
                <p>{question.description}</p>
                <p>{question.difficulty}</p>
              </div>
            )))
          } 
          </div>
    </div>

  )
}

export default Page