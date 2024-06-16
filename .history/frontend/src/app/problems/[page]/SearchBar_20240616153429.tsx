import { SelectMenu } from '@/components/SelectMenu'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/redux-toolkit/Typed-hooks'
import React from 'react'

const SearchBar = ({setQuestion}) => {

    const {tags} = useAppSelector(state=>state.questions);

  return (
    <div>
        <Input placeholder='Search for problems'/>
        <SelectMenu
    </div>
  )
}

export default SearchBar