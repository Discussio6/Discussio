"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { Content } from '../SearchType';
import { Icon } from '@iconify/react';
import { Tag } from '@/components/ui/tag';
import { LectureNameDiv } from './LectureNameDiv';
import { InstructorDiv } from './InstructorDiv';
type Props = {
    item: Content;
    index: number;
};

const ResultItem = ({ item,index }: Props) => {

    const calcTagFontSize = (tag: string) => {
        if(tag.length >= 9) {
            return 'text-xs';
        }
        else {
            return 'text-base';
        }
    }
    const hanldeOnClick = () => {
        //go to content page with index
        window.open(`/content?id=${index}`, '_blank');
    }
    return (
        <div className='flex flex-row gap-8 items-center bg-slate-200 hover:brightness-75 rounded-lg' onClick={hanldeOnClick}>
            <div className='flex flex-col w-60'>
                <LectureNameDiv lectureName={item.lecture_name} />
                <div className='flex flex-row gap-2'>
                    <div className='text-sm text-gray-500 ml-2'>
                        2023.01.01
                    </div>
                    <InstructorDiv instructor={item.instructor} />
                </div>
            </div>
            <div className='text-sm text-gray-500 ml-2 align-middle w-20'>
                {item.lecture_contents.length}개의 파일
            </div>
            <div className='w-20'>
                Admin
            </div>
            <div className='flex flex-row gap-1 w-60'>
                <Tag className='bg-blue-100 w-24 h-7 hover:brightness-75'>
                    {item.course_code}
                </Tag>
                <Tag className={cn('bg-orange-200 w-24 h-7 hover:brightness-75', calcTagFontSize(item.content_type))}> 
                    {item.content_type}
                </Tag>
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
        </div>
    )
};
export default ResultItem;