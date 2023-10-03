
import React, { useState, useEffect } from 'react'
import searchStore from "../SearchStore";
import { DepartmentList, departmentList } from "../SearchType";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger} from '@/components/ui/select';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@radix-ui/react-separator';
const DepartMentArea = () => { // select with accordion 
    let departObject: DepartmentList = departmentList
    const [departMent,setDepartment] = useState<string>("");
    const handleDepartmentChange = (value : string) => {
        setDepartment(value);
        searchStore.setDepartment(value);
    }
    return (
        <SelectRoot onValueChange={handleDepartmentChange}>
            <SelectTrigger placeholder='Department' className='w-36 bg-white rounded-md text-sm'>
                
                {departMent.length > 6 ? departMent.slice(0,6)+"..." : departMent
                }
            </SelectTrigger>
            <SelectContent>
                <AccordionRoot type='single' collapsible>
                {Object.entries(departObject).map(([key, value]) => {
                    return (
                        <>
                        <AccordionItem key={key} value={key} className='font-bold'>
                            <AccordionTrigger>{key}</AccordionTrigger>
                            <AccordionContent className='font-normal'>
                            {value.map((item: string) => {
                                return (
                                    <SelectItem value={item}>
                                        {item}
                                    </SelectItem>
                                );
                            })}
                            </AccordionContent>
                            
                        </AccordionItem>
                        <Separator decorative orientation="horizontal" className='my-2 bg-gray-300' />
                        </>
                        
                    )
                })}
                </AccordionRoot>
            </SelectContent>
        </SelectRoot>
    )
}
export default DepartMentArea;