"use client"
import { Button } from "@/components/ui/button";
import { getSearch, getSearchProps, useGetSearch } from "@/lib/queries/search";
import { set } from "lodash-es";
import { useState } from "react";
import DiscussionsList from "../discussions/DiscussionsList";
import FlashcardList from "../flashcards/FlashcardList";
import DiscussionItem from "@/components/common/DiscussionItem";
import FlashcardItem from "../flashcards/FlashcardItem";

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [renderResults, setRenderResults] = useState(null);
    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }
    const result = useGetSearch({ keyword: searchKeyword, count: 10, page: 1, orderBy: "cAt:desc" });

    const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSearchKeyword(keyword);
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
                <div className="flex flex-row gap-4 text-xl font-bold">
                    Discussions and Questions
                </div>
                {result.status == "loading" ? (
                    <div className="text-center my-16 text-slate-500">Loading...</div>
                ) : (<article className="flex flex-col gap-2">
                    <div className="text-lg font-bold">{result.data?.discussions.total} results</div>
                    {result.data?.discussions.data && result.data?.discussions.total > 0 ? (
                        <div className="flex flex-col gap-4">
                            {result.data?.discussions.data?.map((discussion) => (
                                <DiscussionItem key={discussion.id} discussion={discussion} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center my-16 text-slate-500">No results found</div>
                    )}
                </article>)}

            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 flex flex-row gap-4 text-xl font-bold ">
                    Flashcards
                </div>
                {result.status == "loading" ? (
                    <div className="text-center my-16 text-slate-500">Loading...</div>
                ) : (<article className="flex flex-col gap-2">
                    <div className="text-lg font-bold">{result.data?.flashcards.total} results</div>
                    {result.data?.flashcards.data && result.data?.flashcards.total > 0 ? (
                        <div className="flex flex-col gap-4">
                            {result.data?.flashcards.data?.map((flashcard) => (
                                <FlashcardItem key={flashcard.id} flashcard={flashcard} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center my-16 text-slate-500">No results found</div>
                    )}
                </article>)}

            </div>
        </main>
    )
}
export default SearchPage;