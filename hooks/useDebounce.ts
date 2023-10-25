import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 200) => {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const handler: NodeJS.Timeout = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debounceValue;
};
