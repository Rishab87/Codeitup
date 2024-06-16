"use client"

import { getQuestionsByPage } from '@/apis/apiFunctions/questions';
import Navbar from '@/components/Navbar';
import React, { useEffect  , useState} from 'react'
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/Typed-hooks';
import SearchBar from './SearchBar';
import QuestionsTable from './QuestionTable';
import { setQuestions } from '@/redux-toolkit/slices/questions';

const Page = ({params}:{params:{page:string}}) => {

    const {page} = params;


    const dispatch = useAppDispatch();

    useEffect(()=>{

      const fetchQuestions = async()=>{
        const questions  = await getQuestionsByPage(page);
        //fetch questions acc to page
        dispatch(setQuestions(questions));
      } 

      fetchQuestions();

    } , [page]);

    const {tags} = useAppSelector(state=>state.questions);

  return (
    <div className='h-[100vh]'>
          <Navbar/>
          <div className='flex flex-col justify-center items-center'>
          <h1 className='mt-20 md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>Structured Questions</h1>
          <SearchBar tags={tags}/>
          <QuestionsTable/>
          </div>
    </div>

  )
}

export default Page