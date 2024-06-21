import { SelectMenu } from '@/components/SelectMenu'
import React ,  {useState} from 'react'
import { submitProblem } from '@/apis/apiFunctions/submitCode';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAppSelector } from '@/redux-toolkit/Typed-hooks';

const CodeEditor = ({config , questionId , setMessage , setLoading , loading}:{config:any , questionId:string , setMessage: Function , setLoading:Function , loading:boolean}) => {

    const [language , setLanguage] = React.useState<string>('cpp')
    const [theme , setTheme] = React.useState<string>('vs-dark')
    const {token , user} = useAppSelector(state=>state.auth);

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [code , setCode] = useState<string | undefined>("");


    const submitCode = async()=>{

        if(!token){
            toast("Please login to submit code");
            return;
        }

        if(code === ""){
            toast("Please write something");
            return;
        }

        setLoading(true);

        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
        setSocket(socket);
        socket.send(JSON.stringify({userId: user.id , close: false}));
        console.log("Connected to server");
        }
        
      
        console.log(code + config[language].executionCode);


        await submitProblem(code + '\n' + config[language].executionCode , language , questionId , code!);

        socket.onmessage = (message)=>{
            console.log("Message from server: " + message.data);
            setMessage(JSON.parse(message.data));
            setLoading(false);
            socket.send(JSON.stringify({userId: user.id , close: true}));
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
                <Button className={`w-[100px] ${loading? "opacity-50": "opacity-100"}`} onClick={submitCode} disabled={loading}>Submit</Button>
            </div>
        </div>
        {
            config && (
                <Editor
                language={language}
                value={config[language].userCode}
                onChange={(value)=>setCode(value)}
                theme={theme}
                />
            )
        }
        {
            !config && (
                <Skeleton className='h-[full] w-full'/>
            )
        }

    </div>
  )
}

export default CodeEditor