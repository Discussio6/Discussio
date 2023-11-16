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

export const ACL = ["PUBLIC", "PRIVATE", "FRIENDS"] as const;

export const REPORT_TYPES = ["Questions", "Discussions", "Quizzes", "Flashcards", "Comments", "Others"] as const;
