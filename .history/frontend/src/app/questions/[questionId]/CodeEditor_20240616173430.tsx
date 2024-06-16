import { SelectMenu } from '@/components/SelectMenu'
import React from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';

const CodeEditor = ({config}:{config:any}) => {

    const [language , setLanguage] = React.useState<string>('cpp')
    const [theme , setTheme] = React.useState<string>('vs-dark')


  return (
    <div className='flex gap-3 p-2'>
        <div className='flex gap-3'>
            <SelectMenu topic='language' options={["cpp" , "javascript" , "python"]} setState={setLanguage}/>
            <SelectMenu topic='theme' options={["vs-dark" , "vs-light"]} setState={setTheme}/>
        </div>
        <Editor
        language={language}
        value={config.userCode}
        theme={theme}
        />

        <Button>Submit</Button>

    </div>
  )
}

export default CodeEditor