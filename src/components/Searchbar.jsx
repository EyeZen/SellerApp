import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { throttle } from "throttle-debounce";

import { dataLoadStart, dataLoadSuccess, dataLoadFailure } from "../store/slices/cars";
import { useLocation } from "react-router";
import usePaginate from "../hooks/usePaginate";

const SearchWrapper = styled.div`
    padding-block: 15px;
    padding-inline: 20px;

    display: flex;
    gap: 34px;
    align-items: center;

    border-radius: 24px;
    background-color: #eff3f999;
    backdrop-filter: blur(10px);
    border: 1px solid white;
    box-shadow: 0 0 20px ${props => props.theme.colors.shadow};

    position: fixed;
    width: 60%;
    top: 15px;
    z-index: 10;

    & :has(> input:focus) {
        flex: 1;
    }
`;

const SearchBox = styled.div`
    background-color: ${props => props.theme.colors.white};
    width: 350px;
    display: flex;
    color: ${(props) => props.theme.colors.secondary};
    border-radius: 14px;
    padding-inline: 20px;
    padding-block: 12px;

    border: 1px solid white;
    box-shadow: 0 0 2px #dcdcdc;

    & input {
        flex: 1;
        background: none;
        outline: none;
        border: none;
    }
    & input ::placeholder,
    & i {
        color: ${(props) => props.theme.colors.secondary};
    }
`;

const Filter = styled.div`
    cursor: pointer;
    & i {
        margin-left: 0.5em;
        font-size: 0.8em;
    }
`;

export default function Searchbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const paginate = usePaginate();

    const searchTermChangeHandler = (ev) => {
        setSearchTerm(ev.target.value);
    };

    const searchData = throttle(1000, (controller) => {
        if(location.pathname.length && location.pathname.slice[1] !== "1") {
            paginate(1);
        }
        dispatch(dataLoadStart());
        fetch(`http://localhost:3000/cars?model_like=${searchTerm.trim()}`, { signal: controller.signal })
        .then(res => res.json())
        .then(data => dispatch(dataLoadSuccess(data)))
        .catch(err => dispatch(dataLoadFailure(err.message)));
    }, {
        noTrailing: false,
        noLeading: true,
    });

    const relevanceFilter = () => {
        alert("Not Implemented!");
    }

    const brandsFilter = () => {
        alert("Not Implemented");
    }

    // search filter
    useEffect(() => {
        const controller = new AbortController();
        if(searchTerm) {
            searchData(controller);
        } else {
            fetch(`http://localhost:3000/cars`, {
                signal: controller.signal,
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch(dataLoadSuccess(data));
                })
                .catch((err) => dispatch(dataLoadFailure(err.message)));
        }

        return () => controller.abort();
    }, [searchTerm]);

    // onComponentUnmount
    useEffect(() => {
        // return throttledOnSearch.cancel;
        return searchData.cancel;
    }, []);

    return (
        <SearchWrapper>
            <SearchBox>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={searchTermChangeHandler}
                />
                <i className="fas fa-magnifying-glass"></i>
            </SearchBox>

            <Filter onClick={relevanceFilter}>
                <span>Relevance</span>
                <i className="fas fa-chevron-down"></i>
            </Filter>

            <Filter onClick={brandsFilter}>
                <span>All Brands</span>
                <i className="fas fa-chevron-down"></i>
            </Filter>
        </SearchWrapper>
    );
}
