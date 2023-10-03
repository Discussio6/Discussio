import { observer } from "mobx-react";
import searchStore from "../SearchStore";
import { SearchBy } from "../SearchType";
import { contentList } from "../contentList";
import ResultItem from "./ResultItem";
const ResultList = observer(() => {
    if(searchStore.searchTerm.length === 0) return (<div></div>);
    const searchBy:SearchBy = searchStore.searchBy;
    const SearchedList = contentList.filter((content) => {
        if(searchBy === SearchBy.Course){
            return content.lecture_name.includes(searchStore.searchTerm) || content.kor_lecture_name?.includes(searchStore.searchTerm);
        }else if(searchBy === SearchBy.Instructor){
            return content.instructor.includes(searchStore.searchTerm) || content.kor_instructor?.includes(searchStore.searchTerm);
        }else if(searchBy === SearchBy.Id){
            const upperCaseSearchTerm = searchStore.searchTerm.toUpperCase();
            return content.course_id.includes(upperCaseSearchTerm);
        }
    })
    
    return (     
        <div className="flex flex-col space-y-4 items-center">
            {SearchedList.map((content) => {
                return <ResultItem item={content}/>

            })
            }
        </div>
    );
})
export default ResultList;