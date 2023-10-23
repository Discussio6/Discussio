export const QUERY_KEYS = {
	discussions: {
		all: ["discussions"],
		single: (id: number) => ["discussions", id],
		list: (params: any) => ["discussions", "list", params],
	},
};
