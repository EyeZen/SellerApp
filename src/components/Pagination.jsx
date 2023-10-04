import styled from "styled-components";
import usePaginate from "../hooks/usePaginate";

const PaginationWrapper = styled.div`
    padding-block: 15px;
    padding-inline: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 24px;
    /* background-color: ${(props) => props.theme.colors.components}; */
    background-color: #eff3f999;
    backdrop-filter: blur(10px);
    border: 1px solid white;
    box-shadow: 0 0 20px ${props => props.theme.colors.shadow};

    font-weight: bold;
    color: ${(props) => props.theme.colors.secondary};

    position: fixed;
    width: 60%;
    bottom: 15px;
`;

const PaginationControlsWrapper = styled.ul`
    list-style: none;
    padding: 0;

    display: flex;
    gap: 1em;
`;

const PaginationControl = styled.li`
    background-color: ${(props) => props.theme.colors.white};
    width: 2em;
    height: 2em;
    border-radius: 10px;
    box-shadow: 0 0 20px ${props => props.theme.colors.shadow};
    cursor: pointer;
    user-select: none;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    &.active {
        background-color: ${props => props.theme.colors.icon};
    }
    &.disabled {
        cursor: not-allowed;
    }
`;

export default function Pagination({ available, total, page, onPageChange }) {
    const paginate = usePaginate();

    const nextBtnHandler = () => {
        if(page !== 10 && page <= total/6) {
            paginate(page + 1);
        }
    }

    const prevBtnHandler = () => {
        if(page !== 1) {
            paginate(page - 1);
        }
    }

    const pageChangeHandler = (page) => {
        if(page <= total/6) {
            onPageChange(page);
        }
    }

    return (
        <PaginationWrapper>
            <span>
                {available} from {total}
            </span>
            <PaginationControlsWrapper>
                <PaginationControl onClick={prevBtnHandler} className={page === 1 ? "disabled" : ""}>
                    <i className="fa-solid fa-arrow-left"></i>
                </PaginationControl>
                {Array.from({ length: 10 }, (_, idx) => idx + 1).map((p) => (
                    <PaginationControl key={p} onClick={() => pageChangeHandler(p)} className={p === page ? "active" : p > total/6 ? "disabled" : ""}>
                        {p}
                    </PaginationControl>
                ))}
                <PaginationControl onClick={nextBtnHandler} className={page === 10 || total <= 6 ? "disabled" : ""}>
                    <i className="fa-solid fa-arrow-right"></i>
                </PaginationControl>
            </PaginationControlsWrapper>
        </PaginationWrapper>
    );
}
