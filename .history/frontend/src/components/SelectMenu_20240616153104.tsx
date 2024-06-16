import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo({topic , options , setState}: {topic:string , options:string[] , setState: Function}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{topic}</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
