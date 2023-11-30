// enum ContentType {
//     "Contents", "Syllabus", "Exercises", "Lecture slides", "Assignment", "Lecture Notes" 
// }
enum ContentType {
    "필기/노트", "슬라이드/ppt", "과제", "퀴즈", "시험"
}
enum SearchBy {
    Course = "과목명",
    Instructor = "교수명",
    Id = "과목번호"
}
interface DepartmentList {
    공과대학: string[]
    자연과학대학: string[]
    정보바이오융합대학: string[]
    학부: string[]
}
const departmentList:DepartmentList = {
    "공과대학": [
        "기계공학과" ,
        "신소재공학과",
        "에너지화학공학과",
        "원자력공학과",
        "탄소중립(마이크로)",
        "지구도시환경건설과"
    ],
    "자연과학대학": [
        "물리학과",
        "수리과학과",
        "화학과"
    ],
    "정보바이오융합대학": [
        "디자인학과",
        "바이오메디컬공학과",
        "산업공학과",
        "생명공학과",
        "전기전자공학과",
        "컴퓨터공학과"
    ],
    "학부":[
        "경영과학부",
        "새내기학부",
        "인문학부"
    ]
}
interface Content {
    course_id: string,
    course_code: string,
    lecture_name: string,
    semester: string,
    kor_lecture_name?: string,
    content_type: string,
    lecture_contents: string[],
    lecture_url: string,
    instructor: string,
    kor_instructor?: string,
    time_place?: string,
}
export {SearchBy, ContentType, departmentList, type Content, type DepartmentList};