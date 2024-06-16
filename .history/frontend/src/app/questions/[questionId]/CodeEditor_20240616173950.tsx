import { SelectMenu } from '@/components/SelectMenu'
import React ,  {useState} from 'react'
import { submitProblem } from '@/apis/apiFunctions/submitCode';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';

const CodeEditor = ({config , questionId , setMessage}:{config:any , questionId:string , setMessage: Function}) => {

    const [language , setLanguage] = React.useState<string>('cpp')
    const [theme , setTheme] = React.useState<string>('vs-dark')

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [code , setCode] = useState("");

    const submitCode = async()=>{

        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
        setSocket(socket);
        console.log("Connected to server");
        }
        
      
        console.log(code + config[language].executionCode);


        await submitProblem(code + '\n' + config[language].executionCode , "javascript" , questionId);
        
        socket.onmessage = (message)=>{
            console.log("Message from server: " + message.data);
            setMessage(message.data);
            socket.close();
        }
    }

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