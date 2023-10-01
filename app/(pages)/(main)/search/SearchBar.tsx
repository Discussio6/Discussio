"use client";
import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react'
import searchStore from "./SearchStore";
import { DepartmentList, departmentList, SearchBy } from "./SearchType";
import { TextField } from "../../../../components/ui/textfield";
import { Alert, AlertTrigger } from '@/components/ui/alert';
let departObject: DepartmentList = departmentList;
const SearchBar = observer(() => {
    let departObject: DepartmentList = departmentList
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        searchStore.setSearchTerm(searchTerm);
    };
    const SearchByArea = () => {
        const handleSearchByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const searchBy = event.target.value as unknown as SearchBy;
            searchStore.setSearchBy(searchBy);
        }
        return (
            <select
                defaultValue={searchStore.searchTerm}
                onChange={handleSearchByChange}
            >
                {Object.entries(SearchBy).map(([key, value]) => {
                    return (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    );
                })}
            </select>
        )
    }
    const DepartMentArea = () => {
        return (
            <div>
                <ul id="folder-list">
                    {Object.entries(departObject).map(([key, value]) => {
                        return (
                            <li key={key}>
                                <input type="checkbox" id={key} />
                                <label htmlFor={key}>{key}</label>
                                <ul>
                                    {value.map((item: any) => {
                                        return (
                                            <li key={item}>
                                                <input type="checkbox" id={item} />
                                                <label htmlFor={item}>{item}</label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
    return (
        <div>
            <TextField
                label="Search"
                value={searchStore.searchTerm}
                onChange={handleSearchChange}
            />
            <SearchByArea />
            <DepartMentArea />
        </div>
    );
});
export default SearchBar;