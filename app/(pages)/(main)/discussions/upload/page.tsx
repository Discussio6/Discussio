import { Metadata } from "next";
import DiscussionUpload from "./DiscussionUpload";

export const metadata: Metadata = {
	title: "Discussion Upload | Discussio",
};

function DiscussionUploadPage() {
	return <DiscussionUpload />;
}

export default DiscussionUploadPage;
