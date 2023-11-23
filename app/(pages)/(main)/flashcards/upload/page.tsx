import React from "react";
import FlashcardUpload from "./FlashcardUpload";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Flashcard Upload | Discussio",
};

function FlashcardUploadPage() {
	return <FlashcardUpload />;
}

export default FlashcardUploadPage;
