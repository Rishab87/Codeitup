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
              <TableCell className="font-medium">{question.title}</TableCell>
              <TableCell>{question.difficulty}</TableCell>
              <TableCell><Button>Solve</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  