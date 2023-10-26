export const QUERY_KEYS = {
	discussions: {
		all: ["discussions"],
		single: (id: number) => ["discussions", id],
		list: ["discussions", "list"],
		infinite: ["discussions", "infinite"],
		tags: ["discussions", "tags"],
		tagsAll: ["discussions", "tags"],
	},
};
