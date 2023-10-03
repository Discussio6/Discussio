
import { makeAutoObservable } from "mobx";
import { ContentType, SearchBy } from "./SearchType";
class SearchStore {
    searchTerm: string = "";
    searchBy: SearchBy = SearchBy.Course;
    semester: string = "";
    contentType: ContentType[] = Object.values(ContentType).filter((value): value is ContentType => typeof value !== "number");
    department: string = "";

    constructor() {
        makeAutoObservable(this);
    }
    setSearchTerm = (searchTerm: string) => {
        this.searchTerm = searchTerm;
    }
    setSearchBy = (searchBy: SearchBy) => {
        this.searchBy = searchBy;
    }
    setSemester = (semester: string) => {
        this.semester = semester;
    }
    addContentType = (contentType: ContentType) => {
        // check if contentType is already in the list
        if (this.contentType.includes(contentType)) return;
        this.contentType.push(contentType);
    }
    removeContentType = (contentType: ContentType) => {
        // check if contentType is already in the list
        if (!this.contentType.includes(contentType)) return;
        this.contentType = this.contentType.filter((type) => type !== contentType);
    }
    setDepartment = (department: string) => {
        this.department = department;
    }

}

const searchStore = new SearchStore();

export default searchStore;