import { observer } from "mobx-react";
import searchStore from "./SearchStore";
import { SearchBy, Content } from "./SearchType";
import { contentList } from "./contentList";
const ResultList = observer(() => {
    const SearchedList = contentList.filter((content) => {
        const searchBy:SearchBy = searchStore.searchBy;
        const contentItem:Content = content;
        if(searchBy === SearchBy.Course){
            return content.lecture_name.includes(searchStore.searchTerm);
        }
    })
    return (     
        <div>
            <p>Search Term: {searchStore.searchTerm}</p>
        </div>
    );
})
export default ResultList;