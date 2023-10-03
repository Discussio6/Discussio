"use client";
import React from 'react'
import SearchBar from './searchArea/SearchBar'
import ResultList from './resultArea/ResultList';

//abstact db
/*
create table if not exists searchItem (
  search_id int primary key auto_increment,
  course_id string,
  course_code string,
  content_type string,
  sememester string,
  lecture_url string,
  lecture_name string,
  kor_lecture_name string,
  instructor string,
  kor_instructor string,
  time_place string,
  last_update date
);
create table if not exist contentItem (
  content_id int primary key auto_increment,
  file_name string,
  file_type string,
  file_size int,
  file_path string,
  file_url string,
  last_update date,
  foreign key (search_id) references searchItem(search_id)
);
*/
function SearchPage() {
  return (
    <div className='flex flex-col space-y-4 items-center mt-4'>
      <SearchBar/>
      <ResultList/> 
    </div>
  )
}

export default SearchPage