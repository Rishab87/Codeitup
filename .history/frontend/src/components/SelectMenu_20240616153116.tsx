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
        <SelectValue placeholder={`Select ${topic}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{topic}</SelectLabel>
            {
                
            }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
