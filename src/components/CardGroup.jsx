import styled from "styled-components";
import Card from "./Card";
import { markSaved } from "../store/slices/cars";
import { useDispatch } from "react-redux";

const CardsWrapper = styled.div`
    /* width: 60%; */
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-block: 110px;

    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export default function CardGroup({ data }) {
    const dispatch = useDispatch();

    const cardSaveHandler = (id, saved) => {
        dispatch(markSaved({id, saved}));
    }

    const cardRentingHandler = (id) => {
        alert("Renting car "+data.find(item => item.id === id).model);
    }

    return (
        <CardsWrapper>
            {data.map(({ id, ...data }) => (
                <Card
                    key={id}
                    data={data}
                    onSave={(saved) => cardSaveHandler(id, saved)}
                    onRent={() => cardRentingHandler(id)}
                />
            ))}
        </CardsWrapper>
    );
}
