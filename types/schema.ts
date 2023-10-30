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
