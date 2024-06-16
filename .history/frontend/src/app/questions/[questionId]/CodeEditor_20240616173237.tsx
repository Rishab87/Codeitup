import { SelectMenu } from '@/components/SelectMenu'
import React from 'react'

const CodeEditor = ({config}:{config:any}) => {

    const [language , setLanguage] = React.useState<string>('cpp')
    const [theme , setTheme] = React.useState<string>('vs-dark')


  return (
    <div className='flex gap-3 p-2'>
        <div className='flex gap-3'>
            <SelectMenu topic='language' options={["cpp" , "javascript" , "python"]} setState={setLanguage}/>
            <SelectMenu topic='theme' options={["vs-dark" , "vs-light"]} setState={setTheme}/>
        </div>
        <Mono
    </div>
  )
}

export default CodeEditor