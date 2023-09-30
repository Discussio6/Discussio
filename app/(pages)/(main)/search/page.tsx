"use client";
import React from 'react'
import SearchBar from './SearchBar'
import ResultList from './ResultList'
function SearchPage() {
  return (
    <div>
      <SearchBar/>
      <ResultList/> 
    </div>
  )
}

export default SearchPage