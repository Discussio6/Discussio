"use client";
import { useSearchParams } from "next/navigation";
import { contentList } from "../search/contentList";
import ResultItem from "../search/resultArea/ResultItem";
import { Icon } from "@iconify/react/dist/iconify.js";
const ContentPage = () => {
    // get content id from url and find content from contentList
    const searchParams = useSearchParams();
    let id = searchParams.get('id');
    if (!id) return (<></>);
    if (!contentList[parseInt(id)]) return (<></>);
    return (<div className="py-4 px-16">
        <ResultItem item={contentList[parseInt(id)]} index={parseInt(id)} />
        <div className="flex flex-col gap-4 mt-4 mb-2">
            {contentList[parseInt(id)].lecture_contents.map((content, index) => {
                return (
                    <div key={index} className='flex flex-row gap-4 items-center bg-gray-100 hover:brightness-75 rounded-lg'
                        onClick={() => { window.open(content, '_blank') }}>
                        <div className="flex flex-col">
                            <div className="text-lg font-bold">
                                content_name
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="text-sm text-gray-500">
                                    content_date
                                </div>
                                <div className="text-sm font-bold text-gray-500">
                                    5.6MB
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-row items-center'>
                                <Icon icon="ph:eye" />
                                <div>
                                    52
                                </div>
                            </div>
                            <div className='flex flex-row items-center'>
                                <Icon icon="material-symbols:download" />
                                <div>
                                    52
                                </div>
                            </div>
                        </div>

                    </div>);
            }
            )}
        </div>
    </div>);
};
export default ContentPage;