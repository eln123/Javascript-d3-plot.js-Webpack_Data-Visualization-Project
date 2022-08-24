import React from "react";
import SearchIcon from "@material-ui/icons/Search"

function SearchBar({ placeholder, data }) {
    return (
        <div className='search'>
            <div className="searchInputs">
                <input type="text" placeholder={placeholder}/>
                <div className="searchIcon"><SearchIcon/></div>
            </div>
            {/* <div className="dataResult">
                {data.map((value, key) => {
                    return <div>{value.data}</div>
                })}
            </div> */}
        </div>
    )
}

export default SearchBar