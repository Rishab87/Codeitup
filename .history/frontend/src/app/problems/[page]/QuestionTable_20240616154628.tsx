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
  
  export function QuestionsTable() {

    const {questions} = useAppSelector(state=>state.questions);

    return (
        <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="font-semibold">{question.title}</TableCell>
              <TableCell className={``}>{question.difficulty}</TableCell>
              <TableCell><Button variant={"outline"}>Solve</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  