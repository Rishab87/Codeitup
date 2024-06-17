"use client"

import React, { useEffect , useState } from 'react'
import { getQuestionsById } from '@/apis/apiFunctions/questions';
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
import CodeEditor from './CodeEditor';
import OutputBox from './OutputBox';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const Page = ({params}:{params:{questionId:string}}) => {

    const {questionId} = params;

    const [question , setQuestion] = useState<any>();
    const [message, setMessage] = useState<any>(null);




    useEffect(()=>{

        const fetchQuestion = async()=>{
            console.log(questionId);
            const question = await getQuestionsById(questionId);
            setQuestion(question);
        }

        fetchQuestion();

    } , []);

    //ws connection to get results

 

    
  return (
    <div className='w-[100vw] h-[100vh] overflow-hidden'>
        <Navbar/>
        <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border relative bottom-12"  
      >
        <ResizablePanel defaultSize={40} className='h-fit'>
        <Tabs defaultValue="Questions" className="w-full p-2">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Questions">Questions</TabsTrigger>
                <TabsTrigger value="Submissions">Submissions</TabsTrigger>
                <TabsTrigger value="Discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value='Questions' className='w-[100%] h-full '>
                <QuestionPage question= {question} />
              
            </TabsContent>
            <TabsContent value="Submissions">
                Coming Soon
            </TabsContent>
            <TabsContent value="Discussion">
                Coming Soon
            </TabsContent>
        </Tabs>
        
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
                <CodeEditor config={question?.config} questionId={question?.id} setMessage={setMessage}/>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <OutputBox examples={question?.examples} message={message}/>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Page