"use client";

import { Button } from "@/components/ui/button";
import { useGetSearch } from "@/lib/queries/search";
import { useCallback, useEffect, useState } from "react";
import DiscussionItem from "@/components/common/DiscussionItem";
import FlashcardItem from "../flashcards/FlashcardItem";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import * as qs from "qs";
import Pagination from "@/components/common/Pagination";
import BeatLoader from "@/components/common/BeatLoader";

function SearchClientPage() {
	const searchParams = useSearchParams();
	const key = searchParams.get("key") || "";
	const initialPage = searchParams.get("page") || "1";
	const initialCount = searchParams.get("count") || "10";
	
	const router = useRouter();
	const [keyword, setKeyword] = useState(key || "");
	const page = parseInt(initialPage || "1");
	const count = parseInt(initialCount || "10");
	const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};
	const { data: searchData, isLoading } = useGetSearch({
		keyword: key,
		count,
		page,
		orderBy: "cAt:desc",
	});

	const genLink = useCallback(
		(page: number) => {
			return `/search?${qs.stringify({
				key,
				page,
				count,
			})}`;
		},
		[key, count]
	);

	const onSearch = () => {
		router.push(`/search?key=${keyword}`);
	};

	useEffect(() => {
		setKeyword(key);
	}, [key]);

	const discussions = searchData?.discussions;
	const flashcards = searchData?.flashcards;
	const maxTotal = Math.max(discussions?.total ?? 0, flashcards?.total ?? 0);

	return (
		<main className="container flex flex-col my-8 gap-8">
			<article className="flex flex-col gap-2">
				<div className="w-full flex gap-2 items-center">
					<Input
						className="h-10 w-full resize-none bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent border border-gray-300 rounded-lg"
						placeholder="Search for content, questions, and more..."
						value={keyword}
						onChange={handleKeywordChange}
						onKeyDown={(e) => {
							if (e.key === "Enter") onSearch();
						}}
					/>
					<Button variant="primary" className="flex gap-1" onClick={onSearch}>
						Search
					</Button>
				</div>
			</article>
			{key === "" ? (
				<div className="flex flex-col align-center justify-center gap-4">
					<div className="text-lg text-slate-500 flex justify-center py-8">
						Search for content, questions, and more...
					</div>
				</div>
			) : (
				<>
					{!isLoading ? (
						<>
							{(searchData?.total || 0) > 0 ? (
								<div className="flex flex-col gap-8">
									<h2 className="font-bold text-xl">
										{searchData?.total} results found
									</h2>
									{(discussions?.total || 0 > 0) && (
										<div className="flex flex-col gap-4">
											<div className="flex flex-row gap-4 text-xl font-bold">
												Discussions and Questions
											</div>
											<article className="flex flex-col gap-2">
												<div className="text-lg font-bold">
													{discussions?.total} results
												</div>
												<div className="flex flex-col gap-4">
													{discussions?.hits?.map((discussion) => (
														<DiscussionItem
															key={discussion.id}
															discussion={discussion}
														/>
													))}
												</div>
											</article>
										</div>
									)}
									{(flashcards?.total || 0 > 0) && (
										<div className="flex flex-col gap-4">
											<div className="flex flex-row gap-4 text-xl font-bold">
												Flashcards
											</div>
											<article className="flex flex-col gap-2">
												<div className="text-lg font-bold">
													{flashcards?.total} results
												</div>
												<div className="flex flex-col gap-4">
													{flashcards?.hits.map((flashcard) => (
														<FlashcardItem
															key={flashcard.id}
															flashcard={flashcard}
														/>
													))}
												</div>
											</article>
										</div>
									)}
								</div>
							) : (
								<div className="text-center my-16 text-slate-500">
									No results found
								</div>
							)}
						</>
					) : (
						<div className="flex flex-col my-12 gap-4 justify-center items-center">
							<BeatLoader />
							<div className="text-center text-slate-500">
								Loading Contents...
							</div>
						</div>
					)}
				</>
			)}
			<div className="flex justify-center items-center">
				<Pagination
					count={count}
					page={page}
					total={maxTotal}
					pageCnt={10}
					genLink={genLink}
				/>
			</div>
		</main>
	);
}

export default SearchClientPage;
