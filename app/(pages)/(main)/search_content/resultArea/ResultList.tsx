import { observer } from "mobx-react";
import searchStore from "../SearchStore";
import { SearchBy } from "../SearchType";
import { contentList } from "../contentList";
import ResultItem from "./ResultItem";
import { useRef, useState } from "react";
const ResultList = observer(() => {
    
    const searchBy: SearchBy = searchStore.searchBy;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScrollAtBottom, setIsScrollAtBottom] = useState(true);
    const handleScroll = () => {
        // check if scroll is at the bottom
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer === null) return;
        const scrollContainerHeight = scrollContainer.scrollHeight;
        const scrollContainerScrollTop = scrollContainer.scrollTop;
        const scrollContainerClientHeight = scrollContainer.clientHeight;
        const scrollContainerScrollBottom = scrollContainerHeight - scrollContainerScrollTop - scrollContainerClientHeight;
        if (scrollContainerScrollBottom < 100) {
            setIsScrollAtBottom(true);
        }else{
            setIsScrollAtBottom(false);
        }
    };
    const SearchedList = contentList.filter((content) => {
        if (searchBy === SearchBy.Course) {
            return content.lecture_name.includes(searchStore.searchTerm) || content.kor_lecture_name?.includes(searchStore.searchTerm);
        } else if (searchBy === SearchBy.Instructor) {
            return content.instructor.includes(searchStore.searchTerm) || content.kor_instructor?.includes(searchStore.searchTerm);
        } else if (searchBy === SearchBy.Id) {
            const upperCaseSearchTerm = searchStore.searchTerm.toUpperCase();
            return content.course_id.includes(upperCaseSearchTerm);
        }
    })
    if (searchStore.searchTerm.length === 0) return (<div></div>);
    return (
        <div className="flex overflow-y-auto rounded-lg scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-rounded-lg scrollbar-w-1 max-h-[80vh]">
            <div className="flex flex-col h-5/6 space-y-4 min-h-min items-center bg-slate-200 px-2 py-4">
                {SearchedList.map((content) => {
                    return <ResultItem item={content} index = {contentList.indexOf(content)} />
                })
                }
            </div>
        </div>
    );
})
export default ResultList;