import { Quiz } from "@/types/schema";

interface QuizListProps {
	initialQuizzes: Quiz[];
	initialTotal: number;
	page?: number;
	count?: number;
	orderBy?: string;
}
const QuizList = ({
	initialQuizzes,
	initialTotal,
	page,
	count,
	orderBy,
}: QuizListProps) => {
	return null;
};
export default QuizList;
