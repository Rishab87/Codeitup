import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useAppSelector } from "@/redux-toolkit/Typed-hooks"
import { Button } from "@/components/ui/button";
import { Router } from "next/router";
  
  export function QuestionsTable() {

    const {questions} = useAppSelector(state=>state.questions);

    return (
    <div className="w-[50%]">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Difficulty</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {questions.map((question) => (
                <TableRow key={question.id}>
                <TableCell className="font-semibold cursor-pointer" onClick={()=>Router.push()}>{question.title}</TableCell>
                <TableCell className={``}>{question.difficulty}</TableCell>
                <TableCell><Button variant={"outline"}>Solve</Button></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </div>
    )
  }
  