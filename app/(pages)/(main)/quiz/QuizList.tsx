import { SearchBar } from "@/components/common/SearchBar"
import { Quiz } from "@/types/schema";

interface QuizListProps {
    initialQuizzes: Quiz[];
    initialTotal: number;
    page?: number;
    count?: number;
    orderBy?: string;

}
const QuizList = ({ initialQuizzes, initialTotal, page, count, orderBy }: QuizListProps) => {
}
export default QuizList