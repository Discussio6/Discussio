"use client";
import { Button } from "@/components/ui/button";
import { useGetSearch } from "@/lib/queries/search";
import { useState } from "react";
import DiscussionItem from "@/components/common/DiscussionItem";
import FlashcardItem from "../flashcards/FlashcardItem";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface Props {
	searchParams: {
		key: string;
		page: string;
		count: string;
	};
}

const SearchPage = ({
	searchParams: { key, page: initialPage, count: initialCount },
}: Props) => {
	const router = useRouter();
	const [keyword, setKeyword] = useState(key);
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

	const onSearch = () => {
		router.push(`/search?key=${keyword}`);
	};

	const discussions = searchData?.discussions;
	const flashcards = searchData?.flashcards;

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
			{key == "" ? (
				<div className="flex flex-col align-center justify-center gap-4">
					<div className="text-lg text-slate-500">
						Search for content, questions, and more...
					</div>
				</div>
			) : (
				<>
					<div className="flex flex-col gap-4">
						<div className="flex flex-row gap-4 text-xl font-bold">
							Discussions and Questions
						</div>
						{isLoading ? (
							<div className="text-center my-16 text-slate-500">Loading...</div>
						) : (
							<article className="flex flex-col gap-2">
								<div className="text-lg font-bold">
									{discussions?.total} results
								</div>
								{discussions?.total && discussions.total > 0 ? (
									<div className="flex flex-col gap-4">
										{discussions?.hits?.map((discussion) => (
											<DiscussionItem
												key={discussion.id}
												discussion={discussion}
											/>
										))}
									</div>
								) : (
									<div className="text-center my-16 text-slate-500">
										No results found
									</div>
								)}
							</article>
						)}
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-row gap-4 text-xl font-bold">
							Flashcards
						</div>
						{isLoading ? (
							<div className="text-center my-16 text-slate-500">Loading...</div>
						) : (
							<article className="flex flex-col gap-2">
								<div className="text-lg font-bold">
									{flashcards?.total} results
								</div>
								{flashcards?.total && flashcards.total > 0 ? (
									<div className="flex flex-col gap-4">
										{flashcards.hits?.map((flashcard) => (
											<FlashcardItem key={flashcard.id} flashcard={flashcard} />
										))}
									</div>
								) : (
									<div className="text-center my-16 text-slate-500">
										No results found
									</div>
								)}
							</article>
						)}
					</div>
				</>
			)}
		</main>
	);
};
export default SearchPage;
