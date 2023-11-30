"use client"
import { Button } from "@/components/ui/button";
import { getSearch, getSearchProps, useGetSearch } from "@/lib/queries/search";
import { useState } from "react";

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");
    const [quizReserachs, setQuizReserachs] = useState([]);
    const [discussionReserachs, setDiscussionReserachs] = useState([]);
    const [flashcardReserachs, setFlashcardReserachs] = useState([]);
    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }
    const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        const searchProps: getSearchProps = {
            keyword: keyword,
            count: 10,
            page: 1,
            orderBy: "cAt:desc",
        }
        const result = useGetSearch(searchProps);
        console.log(result);
    }

    return (
        <main className="container flex flex-col my-8 gap-8">
            <article className="flex flex-col gap-2">
                <div className="w-full flex gap-2 items-center">
                    <input className="h-10 w-full resize-none bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent border border-gray-300 rounded-lg"
                        placeholder="Search for content, questions, and more..."
                        onChange={handleKeywordChange}></input>
                    <Button variant="primary" className="flex gap-1" onClick={onClickSearch}>
                        Search
                    </Button>
                </div>
            </article>
            <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        quiz reserachs
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        discussion reserachs
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        flashcard reserachs
                    </div>
                </div>
        </main>
    )
}
export default SearchPage;