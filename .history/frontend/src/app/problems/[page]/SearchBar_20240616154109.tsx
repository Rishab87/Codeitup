import { SelectMenu } from '@/components/SelectMenu'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/redux-toolkit/Typed-hooks'
import React from 'react'

const SearchBar = () => {

    const {tags} = useAppSelector(state=>state.questions);
    const [tag , setTag] = React.useState<string | null>(null);
    const [difficulty , setDifficulty] = React.useState<string | null>(null);
    const [search , setSearch] = React.useState<string | null>(null);


    const difficultyOptions = ["easy" , "medium" , "hard"];
    //functions to search 

  return (
    <div className='flex gap-3'>
        <Input placeholder='Search for problems'/>
        <SelectMenu topic={"tag"} setState={setTag} options={tags}/>
        <SelectMenu topic={"difficulty"} setState={setDifficulty} options={difficultyOptions}/>
    </div>
  )
}

export default SearchBar