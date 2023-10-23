export interface SingleResponse<T> {
	success: boolean;
	data: T;
}

export interface ListResponse<T> {
	total: number;
	hits: T[];
}

export interface Discussion {
	id: number;
	title: string;
	content: string;
	User: User;
	authorId: string;
	isQna: boolean;
	isAccepted: boolean;
    parent_id?: number;
	Children?: Discussion[];
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
