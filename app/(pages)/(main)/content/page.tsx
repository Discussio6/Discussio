"use client";
import { useSearchParams } from "next/navigation";
import { contentList } from "../search/contentList";
const ContentPage = () => {
    // get content id from url and find content from contentList
    const searchParams = useSearchParams();
    let id = searchParams.get('id');
    if(!id) return (<div></div>);
    if(!contentList[parseInt(id)]) return (<div></div>);
    return (<div>
        {contentList[parseInt(id)].lecture_contents.map((content, index) => {
            return (
            <div key={index}>
                <a href= {content} target="_blank" rel="noopener noreferrer">
                    {content}
                </a>
            </div>);
        }
        )}
    </div>);
};
export default ContentPage;