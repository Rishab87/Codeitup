import { getQuestionsByFilter } from '@/apis/apiFunctions/questions'
import { SelectMenu } from '@/components/SelectMenu'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/Typed-hooks'
import { setQuestions } from '@/redux-toolkit/slices/questions'
import React, { useEffect } from 'react'

const SearchBar = ({fetchQuestions}: {fetchQuestions:Function}) => {

    const {tags} = useAppSelector(state=>state.questions);
    const [tag , setTag] = React.useState<string>("");
    const [difficulty , setDifficulty] = React.useState<string>('');
    const [search , setSearch] = React.useState<string>("");


    const dispatch = useAppDispatch();

    const {questions} = useAppSelector(state=>state.questions);


    const difficultyOptions = ["easy" , "medium" , "hard"];
    //functions to search acc to filters and input

    const searchAPI = async()=>{
      dispatch(setQuestions(null));
      const questions= await getQuestionsByFilter(tag.toLocaleLowerCase() , difficulty , search);
      dispatch(setQuestions(questions));

    }

    useEffect(()=>{

      if(!search && !tag && !difficulty){
        fetchQuestions();
        return;
      }
      
      searchAPI();

    } , [search , tag , difficulty]);

    const removeFilters = ()=>{
      setTag("");
      setDifficulty("");
      setSearch('');
    }

  return (
    <div className='flex gap-3'>
        <Input placeholder='Search for problems' onChange={(e)=>setSearch(e.target.value)} value={search}/>
        <SelectMenu topic={"tag"} setState={setTag} options={tags}/>
        <SelectMenu topic={"difficulty"} setState={setDifficulty} options={difficultyOptions}/>
        <p className='font-semibold text-red-500 text-lg cursor-pointer' onClick={removeFilters}>Clear</p>
    </div>
  )
}

export default SearchBar