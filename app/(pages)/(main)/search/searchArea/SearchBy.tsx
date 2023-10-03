import React, { useState, useEffect } from 'react'
import searchStore from "../SearchStore";
import { SearchBy } from "../SearchType";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchByArea = () => {
    const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.Course);
    const handleSearchByChange = (value: string) => {
        let searchByVal = value as unknown as SearchBy;
        setSearchBy(searchByVal);
        searchStore.setSearchBy(searchByVal);
    }
    return (
        <SelectRoot onValueChange={handleSearchByChange}>
            <SelectTrigger placeholder={searchBy as unknown as string} className='w-36'>
                {searchBy}
            </SelectTrigger>
            <SelectContent>
                {Object.entries(SearchBy).map(([key, value]: [string, any]) => {
                    if(typeof value === "number") return;
                    return (
                        <SelectItem value={value} key={value}>
                            {value}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </SelectRoot>
    )
}
export default SearchByArea;