import { SelectMenu } from '@/components/SelectMenu'
import React from 'react'

const CodeEditor = ({config}:{config:any}) => {

    const [language , setLanguage] = React.useState<string>('cpp')
    const [theme , setTheme] = React.useState<string>('vs-dark')


  return (
    <div>
        <div>
            <SelectMenu topic='language' options={["cpp" , "javascript" , "python"]} setState={setLanguage}/>
            <SelectMenu topic='theme' options={["vs-dark" , "vs-light"]} setState={set}/>
        </div>
    </div>
  )
}

export default CodeEditor