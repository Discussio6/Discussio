import {enableStaticRendering} from 'mobx-react-lite';
import SearchStore from "../SearchStore";

enableStaticRendering(typeof window === 'undefined');

const initStore = () => {
    return {
        searchStore: SearchStore,
    };
}