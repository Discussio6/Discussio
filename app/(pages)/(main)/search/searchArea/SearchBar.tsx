"use client";
import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react'
import searchStore from "../SearchStore";
import { DepartmentList, departmentList, SearchBy } from "../SearchType";
import { TextField } from "../../../../../components/ui/textfield";
import SearchByArea from './SearchBy';
import DepartMentArea from './DepartmentArea';
import SemesterArea from './SemesterArea';
import ContentTypeArea from './ContentTypeAra';
const SearchBar = observer(() => {
    let departObject: DepartmentList = departmentList
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        searchStore.setSearchTerm(searchTerm);
    };
    return (
        <div className='flex flex-row space-x-4 bg-slate-100 p-4 rounded-lg'>
            <TextField
                placeholder="검색어 입력"
                value={searchStore.searchTerm}
                onChange={handleSearchChange}
                className='border border-gray-300 w-60'
            />
            <SearchByArea />
            <DepartMentArea />
            <SemesterArea />
            <ContentTypeArea/>
        </div>
    );
});
export default SearchBar;