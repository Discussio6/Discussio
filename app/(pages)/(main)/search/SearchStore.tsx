
import { makeAutoObservable } from "mobx";
import { SearchBy } from "./SearchType";
class SearchStore {
    searchTerm: string = "";
    searchBy: SearchBy = SearchBy.Course;
    semester: string = "";
    contentType: string = "";
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
    setContentType = (contentType: string) => {
        this.contentType = contentType;
    }
    setDepartment = (department: string) => {
        this.department = department;
    }

}

const searchStore = new SearchStore();

export default searchStore;