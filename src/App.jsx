import styled from "styled-components";

import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";
import CardGroup from "./components/CardGroup";
import LoadingIndicator from "./components/LoadingIndicator";

import {
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router";
import { useEffect, useState } from "react";
import { PaginateContext } from "./hooks/usePaginate";
import { useDispatch, useSelector } from "react-redux";
import {
    dataLoadStart,
    dataLoadSuccess,
    dataLoadFailure,
    selectData,
    selectLoading,
} from "./store/slices/cars";

const Container = styled.div`
    background-color: ${(props) => props.theme.colors.background};
`;

const ContentWrapper = styled.div`
    min-height: 100vh;
    width: 60%;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    position: relative;

    @media screen and (max-width: 1500px) {
        width: 100%;
    }
`;

function App() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carsData = useSelector(selectData);
    const loading = useSelector(selectLoading);

    const location = useLocation();
    const [cardData, setCardData] = useState([]);

    const handlePageChange = (page) => {
        setPage(page);
        navigate(`/${page}`);
    };

    // componentDidMount
    useEffect(() => {
        const currentPage = Number(location.pathname.slice(1));
        if (currentPage) setPage(currentPage);
        else setPage(1);
    }, []);

    // Load Page Data
    useEffect(() => {
        const start = (page - 1) * 6;
        const end = start + 6;

        if (!loading && !carsData.length) {
            const controller = new AbortController();
            dispatch(dataLoadStart());

            fetch(`http://localhost:3000/cars`, {
                signal: controller.signal,
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch(dataLoadSuccess(data));
                    setCardData(data.slice(start, end));
                })
                .catch((err) => dispatch(dataLoadFailure(err.message)));

            return () => {
                controller.abort();
            };
        } else {
            setCardData(carsData.slice(start, end));
        }
    }, [page, carsData]);

    const element = loading ? (
        <LoadingIndicator />
    ) : (
        <CardGroup data={cardData} />
    );

    return (
        <Container>
            <ContentWrapper>
                <PaginateContext.Provider value={handlePageChange}>
                    <Searchbar />
                    <Routes>
                        <Route index element={element} />
                        <Route path={`/:page`} element={element} />
                    </Routes>
                    <Pagination
                        available={cardData.length}
                        total={carsData.length}
                        page={page}
                        onPageChange={handlePageChange}
                    />
                </PaginateContext.Provider>
            </ContentWrapper>
        </Container>
    );
}

export default App;
