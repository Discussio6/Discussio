import React, { useState, useEffect } from 'react'
import searchStore from "../SearchStore";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger} from '@/components/ui/select';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion';

const SemesterArea = () => {
    const [semester, setSemester] = useState<string>("");
    const handleSemesterChange = (value: string) => {
        setSemester(value);
        searchStore.setSemester(value);
    }
    // available year 2010- current year
    const year = new Date().getFullYear();
    const availableYear = Array.from(new Array(year - 2010 + 1), (val, index) => index + 2010);
    const availableSemester = ['1학기', '여름학기', '2학기', '겨울학기'];
    
    return (
        <SelectRoot onValueChange={handleSemesterChange}>
            <SelectTrigger placeholder='Semester' className='w-36 text-sm'>
                {semester}
            </SelectTrigger>
            <SelectContent>
                <AccordionRoot type='single' collapsible>
                    {availableYear.reverse().map((year:any) => {
                        return (
                            <AccordionItem key={year} value={year} className='font-bold'>
                                <AccordionTrigger>{year}</AccordionTrigger>
                                <AccordionContent className='font-normal'>
                                    {availableSemester.map((semester) => {
                                        return (
                                            <SelectItem value={year+" "+semester} key={year+" "+semester}>
                                                {year+" "+semester}
                                            </SelectItem>
                                        );
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    }
                    )}
                </AccordionRoot>
            </SelectContent>
        </SelectRoot>
    )
}
export default SemesterArea;