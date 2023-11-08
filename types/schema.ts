export interface SingleResponse<T> {
	success: boolean;
	data: T;
}

export interface ListResponse<T> {
	total: number;
	hits: T[];
}

export interface LikeResponse {
	success: boolean;
	status: "created" | "deleted";
}

export interface Discussion {
	id: number;
	title: string;
	content: string;
	User: User;
	authorId: string;
	isQna: boolean;
	isAccepted: boolean;
	views: number;
	parent_id?: number;
	Children?: Discussion[];
	Likes?: {
		User: User;
		cAt: Date;
	}[];
	Tags: Tag[];
	cAt: Date;
	mAt: Date;
}

export interface User {
	email: string;
	emailVerified?: Date;
	id: string;
	image: string;
	name: string;
}

export interface Tag {
	name: string;
	description?: string;
	cAt: Date;
	mAt: Date;
}
export interface Quiz {
	quiz_id: number;
	user_id: string;
	quiz_name: string;
	quiz_description: string;
	Tags: Tag[];
	acl: string;
	cAt: Date;
	mAt: Date;
	QuizQuestion: QuizQuestion[];
	QuizParticipant: QuizParticipant[];
	User: User;
	QuizParticipantAnswer: QuizParticipantAnswer[];
}

export interface QuizQuestion {
	question_id: number;
	quiz_id: number;
	content: string;
	difficulty: number;
	score: number;
	answer: string;
	is_multiple: boolean;
	cAt: Date;
	mAt: Date;
	Quiz: Quiz;
	QuizAnswer: QuizAnswer[];
	QuizParticipantAnswer: QuizParticipantAnswer[];
}

export interface QuizAnswer {
	answer_id: number;
	question_id: number;
	content: string;
	isAnswer: boolean;
	cAt: Date;
	mAt: Date;
	QuizQuestion: QuizQuestion;
	QuizParticipantAnswer: QuizParticipantAnswer[];
}

export interface QuizParticipant {
	part_id: number;
	quiz_id: number;
	user_id: string;
	startTime: Date;
	endTime: Date;
	cAt: Date;
	Quiz: Quiz;
	User: User;
	QuizParticipantAnswer: QuizParticipantAnswer[];
}

export interface QuizParticipantAnswer {
	panswer_id: number;
	quiz_id: number;
	question_id: number;
	part_id: number;
	answer_id: number;
	cAt: Date;
	mAt: Date;
	Quiz: Quiz;
	QuizQuestion: QuizQuestion;
	QuizParticipant: QuizParticipant;
	QuizAnswer: QuizAnswer;
}
export interface Comment {
	id: number;
	comment: string;
	content_id: number;
	parent_comment_id?: number;
	userId: string;
	User: User;
	Children?: Comment[];
	cAt: Date;
	mAt: Date;
}
