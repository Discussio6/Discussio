import ContentListItem from "@/components/common/ContentListItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	DownloadIcon,
	EyeIcon,
	SearchIcon,
	ThumbsUpIcon,
	ViewIcon,
} from "lucide-react";
import React from "react";

function Home() {
	return (
		<main className="flex flex-col">
			<header className="w-full h-[300px] bg-slate-700 text-white flex flex-col justify-center px-4 py-8">
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-bold">로고</h1>
					<p className="text-slate-300 text-sm font-medium">
						쉽고 편하게 과목별 공부 자료들을 업로드하고 열람하세요
					</p>
				</div>
				<Button className="w-fit mt-12 bg-green-foreground hover:bg-green-700/95 font-bold">
					자세히 알아보기
				</Button>
			</header>
			<article className="flex flex-col gap-2 p-4">
				<div className="flex gap-4 items-center">
					<Input placeholder="필요한 공부 자료를 검색해보세요" className="" />
					<Button size="icon" variant="primary">
						<SearchIcon />
					</Button>
				</div>
				<div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 mt-4 gap-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								지금 <span className="text-red-500">HOT</span> 한 자료
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col">
							<ContentListItem
								title="데이터 사이언스 개론 개념 정리"
								downloadCount={12}
								thumbsUpCount={24}
								date="1분 전"
							/>
							<ContentListItem
								title="응용선형대수학 노트"
								downloadCount={15}
								thumbsUpCount={31}
								date="5분 전"
							/>
							<ContentListItem
								title="확률과 랜덤 프로세스"
								downloadCount={18}
								thumbsUpCount={25}
								date="9분 전"
							/>
							<ContentListItem
								title="고급 프로그래밍 예제"
								downloadCount={18}
								thumbsUpCount={34}
								date="12분 전"
							/>
							<ContentListItem
								title="시계열분석"
								downloadCount={23}
								thumbsUpCount={32}
								date="22분 전"
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">최근 업로드된 자료</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col">
							<ContentListItem
								title="데이터 사이언스 개론 개념 정리"
								downloadCount={12}
								thumbsUpCount={24}
								date="1분 전"
							/>
							<ContentListItem
								title="응용선형대수학 노트"
								downloadCount={15}
								thumbsUpCount={31}
								date="5분 전"
							/>
							<ContentListItem
								title="확률과 랜덤 프로세스"
								downloadCount={18}
								thumbsUpCount={25}
								date="9분 전"
							/>
							<ContentListItem
								title="고급 프로그래밍 예제"
								downloadCount={18}
								thumbsUpCount={34}
								date="12분 전"
							/>
							<ContentListItem
								title="시계열분석"
								downloadCount={23}
								thumbsUpCount={32}
								date="22분 전"
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">내가 찜한 자료</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col">
							<ContentListItem
								title="데이터 사이언스 개론 개념 정리"
								downloadCount={12}
								thumbsUpCount={24}
								date="1분 전"
							/>
							<ContentListItem
								title="응용선형대수학 노트"
								downloadCount={15}
								thumbsUpCount={31}
								date="5분 전"
							/>
							<ContentListItem
								title="확률과 랜덤 프로세스"
								downloadCount={18}
								thumbsUpCount={25}
								date="9분 전"
							/>
							<ContentListItem
								title="고급 프로그래밍 예제"
								downloadCount={18}
								thumbsUpCount={34}
								date="12분 전"
							/>
							<ContentListItem
								title="시계열분석"
								downloadCount={23}
								thumbsUpCount={32}
								date="22분 전"
							/>
						</CardContent>
					</Card>
				</div>
			</article>
		</main>
	);
}

export default Home;
