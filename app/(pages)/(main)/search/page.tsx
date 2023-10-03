"use client";
import React from 'react'
import SearchBar from './searchArea/SearchBar'
import ResultList from './resultArea/ResultList';


function SearchPage() {
  return (
    <div className='flex flex-col space-y-8 items-center mt-4 max-h-[85vh] py-4'>
      <SearchBar/>
      <ResultList/> 
    </div>
  )
}

export default SearchPage