import { SelectMenu } from '@/components/SelectMenu'
import React ,  {useState} from 'react'
import { submitProblem } from '@/apis/apiFunctions/submitCode';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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
    <div className='flex gap-3 pt-2 pl-2 h-full w-full flex-col'>
        <div className='flex justify-between '>
           <div className='flex gap-3'>
                <SelectMenu topic='language' options={["cpp" , "javascript" , "python"]} setState={setLanguage}/>
                <SelectMenu topic='theme' options={["vs-dark" , "vs-light"]} setState={setTheme}/>
           </div>
            <div>
                <Button className='w-[100px]' onClick={submitCode}>Submit</Button>
            </div>
        </div>
        {
            config && (
                <Editor
                language={language}
                value={config[language].userCode}
                theme={theme}
                />
            )
        }
        {
            !config && (
                <Skeleton className='h-full w-full'/>
            )
        }

    </div>
  )
}

export default CodeEditor