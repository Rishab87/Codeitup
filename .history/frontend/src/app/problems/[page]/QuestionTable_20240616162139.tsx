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
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

  export function QuestionsTable() {

    const {questions} = useAppSelector(state=>state.questions);
    const router = useRouter();

    if(!questions){
        return()
            !questions && (
                <div>
                    <Skeleton className="h-[70vh] w-[50%]"/>
                </div>
            )
        }
    }
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
            { questions && (
            questions.map((question) => (
                <TableRow key={question.id}>
                <TableCell className="font-semibold cursor-pointer" onClick={()=>router.push(`/questions/${question.id}`)}>{question.title}</TableCell>
                <TableCell className={`${question.difficulty === "easy"? "text-green-500":question.difficulty === "medium"? "text-yellow-500": "text-red-500"} font-medium`}>{question.difficulty}</TableCell>
                <TableCell><Button variant={"outline"} onClick={()=>router.push(`/questions/${question.id}`)}>Solve</Button></TableCell>
                </TableRow>
            )))}
 
            </TableBody>
        </Table>
      </div>
    )
  }
  