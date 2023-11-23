import { Metadata } from "next";
import QuestionUpload from "./QuestionUpload";

export const metadata: Metadata = {
	title: "Question Upload | Discussio",
};

function QuestionUploadPage() {
	return <QuestionUpload />;
}

export default QuestionUploadPage;
