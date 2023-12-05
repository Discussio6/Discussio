const InstructorDiv = ({instructor}: {instructor: string}) => {
    const sliceInstructor = (instructor: string) => {
        let splited = instructor.split(',');
        let totalLength = 0;
        for(let i = 0; i < splited.length; i++) {
            totalLength += splited[i].length;
            if(totalLength > 10) {
                return splited.slice(0, i).join(',') + ' 외 ' + (splited.length - i) + '명';
            }
        }
        return instructor;
        
    }
    return (
        <div className='text-sm text-gray-500 ml-2'>
            {sliceInstructor(instructor)}
        </div>
    )
}
export { InstructorDiv }