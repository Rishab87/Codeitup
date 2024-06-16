import { SelectMenu } from '@/components/SelectMenu'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/redux-toolkit/Typed-hooks'
import React from 'react'

const SearchBar = ({setQuestion}:{setQuestion:Function}) => {

    const {tags} = useAppSelector(state=>state.questions);
    const [tag , setTag] = React.useState<string | null>(null);
    const [difficulty , setDifficulty] = React.useState<string | null>(null);
    const [search , setSearch] = React.useState<string | null>(null);
    

    const difficultyOptions = ["easy" , "medium" , "hard"];

  return (
    <div>
        <Input placeholder='Search for problems'/>
        <SelectMenu topic={"tag"} />
    </div>
  )
}

export default SearchBar