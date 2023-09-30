"use client";
import { observer } from 'mobx-react';
import React, {useState, useEffect} from 'react'
import searchStore from "./SearchStore";
import { DepartmentList, departmentList } from "./SearchType";
let departObject:DepartmentList = departmentList
const SearchBar= observer(() => {
    let departObject:DepartmentList = departmentList
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        searchStore.setSearchTerm(searchTerm);
      };
    
      return (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchStore.searchTerm}
            onChange={handleSearchChange}
          />
          <select
            defaultValue={searchStore.searchTerm}
            >
            <option value="course">Course</option>
            <option value="professor">Professor</option>
            <option value="semester">Semester</option>
          </select>
          <ul id="folder-list">
            {Object.entries(departObject).map(([key, value]) => {
              return (
                <li key={key}>
                  <input type="checkbox" id={key} />
                  <label htmlFor={key}>{key}</label>
                  <ul>
                    {value.map((item:any) => {
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
    );
});
export default SearchBar;