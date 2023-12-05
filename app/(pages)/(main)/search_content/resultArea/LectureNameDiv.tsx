import { cn } from "@/lib/utils";

const LectureNameDiv =({lectureName}: {lectureName:string}) => {
    const calcLectureNameFontSize = (lectureName: string) => {
        if(lectureName.length > 75) return 'text-xs';
        else if (lectureName.length > 50) {
            return 'text-sm';
        }else if(lectureName.length > 20){
            return 'text-base';
        }
        return 'text-lg';
    }
    return (
        <div className={cn('font-bold', calcLectureNameFontSize(lectureName))}>
            {lectureName}
        </div>
    )
}
export { LectureNameDiv }