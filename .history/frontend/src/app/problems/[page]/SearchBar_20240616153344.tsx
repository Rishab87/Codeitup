import { SelectMenu } from '@/components/SelectMenu'
import { Input } from '@/components/ui/input'
import React from 'react'

const SearchBar = ({tags}: {tags:string[]}) => {

    
  return (
    <div>
        <Input placeholder='Search for problems'/>
        <SelectMenu
    </div>
  )
}

export default SearchBar