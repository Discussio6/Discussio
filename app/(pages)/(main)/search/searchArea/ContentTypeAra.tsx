import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import * as React from "react"
import searchStore from "../SearchStore"
import { ContentType } from "../SearchType"
import { Popover } from "@/components/ui/popover"
const ContentTypeArea = () => {
    const [contentType, setContentType] = React.useState<ContentType[]>(searchStore.contentType);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //if checked, add to searchStore
        //if unchecked, remove from searchStore
        const item = e.target.value as unknown as ContentType;
        if (e.target.checked) {
            setContentType([...contentType, item]);
            searchStore.addContentType(item);
        }
        else {
            setContentType(contentType.filter((i) => i !== item));
            searchStore.removeContentType(item);
        }
    }
    const checkIfChecked = (item: any) => {
        return contentType.includes(item);
    }
    return (
        <Popover>
            <PopoverTrigger className='h-10 w-36 bg-white rounded-md mx-2 border-solid border border-gray-300'>
                Content Type
            </PopoverTrigger>
            <PopoverContent className="flex flex-col space-y-2 p-2 bg-white rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none">
                {Object.values(ContentType).map((key) => {
                    if (typeof key === "number") return;
                    const isChecked = checkIfChecked(key);
                    return (
                        <label>
                            <input type="checkbox" value={key} onChange={handleOnChange} checked={isChecked} />
                            {key}
                        </label>
                    )
                }
                )}
            </PopoverContent>
        </Popover>
    )
}
export default ContentTypeArea;