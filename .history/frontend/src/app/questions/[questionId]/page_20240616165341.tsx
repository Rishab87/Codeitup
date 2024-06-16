"use client"

import React, { useEffect , useState } from 'react'
import { getQuestionsById } from '@/apis/apiFunctions/questions';
import { submitProblem } from '@/apis/apiFunctions/submitCode';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import QuestionPage from './QuestionPage';
import Navbar from '@/components/Navbar';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';

const Page = ({params}:{params:{questionId:string}}) => {

    const {questionId} = params;

    const [question , setQuestion] = useState<any>();

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<string>("");

    const [code , setCode] = useState("");

    useEffect(()=>{

        const fetchQuestion = async()=>{
            console.log(questionId);
            const question = await getQuestionsById(questionId);
            setQuestion(question);
        }

        fetchQuestion();

        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
        setSocket(socket);
        console.log("Connected to server");
        }
        
        socket.onmessage = (message)=>{
            console.log("Message from server: " + message.data);
        }
    } , []);

    //ws connection to get results

    const submitCode = async()=>{
        console.log(code + question.config.javascript.executionCode);
        //submit code


        await submitProblem(code + '\n' + question.config.javascript.executionCode , "javascript" , questionId);

    }


    
  return (
    <div className='w-[100vw]'>
        <Navbar/>
        <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border h-[80vh] w-[100vw]"
      >
        <ResizablePanel defaultSize={40} className='h-[80vh]'>
        <Tabs defaultValue="Questions" className="w-[400px] p-2">
            <TabsList className="grid w-full grid-cols-2 gap-2">
                <TabsTrigger value="Questions">Questions</TabsTrigger>
                <Separator orientation='vertical'/>
                <TabsTrigger value="Submissions">Submissions</TabsTrigger>
                <TabsTrigger value="Discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value='Questions'>
                <QuestionPage question= {question}/>
            </TabsContent>
            <TabsContent value="Submissions">
                Coming Soon</TabsContent>
            <TabsContent value="Discussion">Coming Soon</TabsContent>
        </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
        {question && (
            <div>
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <p>{question.difficulty}</p>
            <p>{question.constraints}</p>
            <textarea name="" id="" onChange={(e:any)=> setCode(e.target.value)}>{question.config.javascript.userCode}</textarea>
            <button onClick={submitCode}>Submit</button>
            </div>
            
        )}
    </div>
  )
}

export default Page