import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchBar.js";
import { 
    deleteSearchResults, 
    buildSearchResults, 
    clearStatsLine, 
    setStatsLine 
} from "./searchResults.js"
import { getSearchTerm } from "./dataFunctions.js";
import { retrieveSearchResults } from "./dataFunctions.js";


document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // Set the focus
    setSearchFocus();
    // TODO: 3 listeners clear text
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);

    const clear = document.getElementById("clear");
    clear.addEventListener("click",clearSearchText);
    clear.addEventListener("keydown", clearPushListener);

    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
}

// Procedural Workflow Function

const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResults()  // TODO: delete search results
    processTheSearch() // process the search
    setSearchFocus();  // set the focus
};

// Procedural

const processTheSearch = async () => {
    clearStatsLine(); // 
    const searchTerm = getSearchTerm();
    if(searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if(resultArray.length)  buildSearchResults(resultArray); 
    setStatsLine(resultArray.length);      
}