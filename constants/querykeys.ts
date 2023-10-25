export const QUERY_KEYS = {
	discussions: {
		all: ["discussions"],
		single: (id: number) => ["discussions", id],
		list: (params: any) => ["discussions", "list", params],
		infinite: (params: any) => ["discussions", "infinite", params],
		tags: (params: any) => ["discussions", "tags", params],
		tagsAll: ["discussions", "tags"],
	},
};
