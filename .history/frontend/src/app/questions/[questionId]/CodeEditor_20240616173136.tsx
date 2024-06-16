import { SelectMenu } from '@/components/SelectMenu'
import React from 'react'

const CodeEditor = ({config}:{config:any}) => {

    const [language , setLanguage] = React.useState<string>('cpp')
    const [theme , setTheme] = React.useState<string>('vs-dark')


  return (
    <div>
        <div>
            <SelectMenu topic='language' options={["cpp" , "javascript" , "python"]} setState={set}/>
            <SelectMenu/>
        </div>
    </div>
  )
}

export default CodeEditor