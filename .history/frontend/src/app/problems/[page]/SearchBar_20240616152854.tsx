import { Input } from '@/components/ui/input'
import React from 'react'

const SearchBar = ({tags}: {tags:string[]}) => {
  return (
    <div>
        <Input placeholder='Search for problems'/>
    </div>
  )
}

export default SearchBar