import React from "react";
import "./search.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const SearchModal = (props) => {

    const {open, close, SearchValue} = props;

    const Search = (event) =>{       
       SearchValue(event.target.value);
    }   

    return(
        <div className= {open ? "Open SearchModal" : "SearchModal"} >

            {open ? (
                            <div className="searchCon flex flex-jc-b flex-ai-c">
                            <FaSearch className="icon"/>
                            <input type="text" id="searchInput" onChange={Search} name="searchInput" placeholder="검색할 키워드를 입력하세요!"/>
                            <button className="InputReset" onClick={close}><AiOutlineClose/></button>
                        </div>
            ) : null}
           
        </div>
    )
}

export default SearchModal;