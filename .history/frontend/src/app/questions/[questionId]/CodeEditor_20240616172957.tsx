import { SelectMenu } from '@/components/SelectMenu'
import React from 'react'

const CodeEditor = () => {

    const [language , setLanguage] = React.useState<string>('')
    
  return (
    <div>
        <div>
            <SelectMenu/>
            <SelectMenu/>
        </div>
    </div>
  )
}

export default CodeEditor