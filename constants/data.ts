export const SUB_MENUS = [
	{
		label: "Questions",
		link: "/questions",
	},
	{
		label: "Discussions",
		link: "/discussions",
	},
	{
		label: "Quizzes",
		link: "/quizzes",
	},
	{
		label: "Flashcards",
		link: "/flashcards",
	},
];

export const FLASHCARD_RESULT_PAGE_COUNT = 6;

export const ACL = ["PUBLIC", "PRIVATE", "FRIENDS"] as const;

export const REPORT_TYPES = ["Questions", "Discussions", "Quizzes", "Flashcards", "Comments", "Others"] as const;

export const USER_NAVIGATION = ["home", "favorites", "uploads", "notifications", "settings"] as const;