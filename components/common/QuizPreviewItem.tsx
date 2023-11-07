import { Quiz } from "@/types/schema";
import { Icon } from "@iconify/react/dist/iconify.js";

interface QuizItemProps {
    quiz: Quiz;
}
const QuizPreviewItem = ({ quiz }: QuizItemProps) => {
    return (
        <div className="flex flex-col justify-between">
            <div>{quiz.quiz_name}</div>
            <div>
                <Icon icon="iconamoon:profile-circle-fill" />
                <div>{quiz.user_id}</div>
            </div>
            <div>{quiz.category}</div>
            <div>
                <button>Preview</button>
            </div>
        </div>
    )

}