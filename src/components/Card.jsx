import styled from "styled-components";
import { useEffect, useState } from "react";

// Card Styles
const CardWrapper = styled.div`
    width: 100%;
    max-height: 410px;
    border: 1px solid black;

    border-radius: 24px;
    background-color: ${(props) => props.theme.colors.components};
    border: 1px solid white;
    box-shadow: 0 0 20px ${(props) => props.theme.colors.shadow};
    overflow: hidden;
    padding: 10px;
`;

// Carousel
const CarsCarousel = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    aspect-ratio: 3/2;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CarouselControls = styled.ul`
    list-style: none;
    padding: 0;
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    margin-inline: auto;
    bottom: 10px;

    display: flex;
    justify-content: center;
    gap: 5px;

    & li {
        width: 10px;
        height: 2px;
        background-color: #ffffffa8;
        border-radius: 5px;
        cursor: pointer;
        transition: scale 200ms linear;
    }
    & li.active {
        background-color: #ffffff;
        scale: 1.2 1.2;
    }
`;

// Card Content
const CardContent = styled.div`
    padding: 1em;
`;
// Model Info
const ModelInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.colors.primary};

    & h3 {
        font-size: 1.2rem;
    }
    & span {
        font-size: 0.9rem;
        font-weight: bold;
        border: 1px dashed ${(props) => props.theme.colors.accent};
        border-radius: 10px;
        padding: 0.2em 1em;
    }
`;

// Specs
const CarSpecs = styled.ul`
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 1em;
    margin-block: 1.5em;
    font-size: 0.9em;

    color: ${(props) => props.theme.colors.secondary};

    & i {
        color: ${(props) => props.theme.colors.accent};
        margin-right: 1ex;
    }
`;

const Divider = styled.hr`
    border-top: 1px solid ${props => props.theme.colors.divider};
`;

// Buttons
const CardOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5em;
`;

const CarRentWrapper = styled.span`
    font-size: 0.8em;
    & span {
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

const ButtonGroup = styled.div`
`;

const SaveButton = styled.button`
    background: none;
    border: none;
    background-color: ${props => props.theme.colors.icon};
    color: ${props => props.theme.colors.accent};
    font-size: 1.2rem;
    width: 2em;
    height: 2em;
    border-radius: 10px;
    margin-right: 0.5em;
    cursor: pointer;
    user-select: none;

    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

const RentButton = styled.button`
    background: none;
    border: none;
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
    font-size: 1rem;
    padding: 0.6em 0.8em;
    border-radius: 10px;
    cursor: pointer;
`;

export default function Card({ data, onSave, onRent }) {
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [isSaved, setSaved] = useState(data.saved ?? false);

    const carouselControls = data.imgList.map((_, idx) => (
        <li
            onClick={() => setVisibleIndex(idx)}
            className={idx === visibleIndex ? "active" : ""}
        ></li>
    ));

    useEffect(() => {
        const carouselScrollInterval = setInterval(() => {
            setVisibleIndex((visibleIndex) => (visibleIndex + 1) % 3);
        }, 5000);

        return () => clearInterval(carouselScrollInterval);
    }, []);

    // Handle card save
    const cardSaveHandler = () => {
        setSaved(saved => !saved);
    }
    useEffect(() => {
        if(isSaved !== data.saved) {
            onSave(isSaved);
        }
    }, [isSaved]);

    return (
        <CardWrapper>
            <CarsCarousel>
                <img src={data.imgList[visibleIndex]} />
                <CarouselControls>{...carouselControls}</CarouselControls>
            </CarsCarousel>
            <CardContent>
                <ModelInfo>
                    <h3 className="car-model">{data.model}</h3>
                    <span className="car-year">{data.year}</span>
                </ModelInfo>
                <CarSpecs>
                    <li>
                        <i className="fas fa-user-group"></i> {4} People
                    </li>
                    <li>
                        <i className="fas fa-gas-pump"></i> {"Hybrid"}
                    </li>
                    <li>
                        <i className="fas fa-gauge"></i>{" "}
                        {"6.1km / 1-litre"}
                    </li>
                    <li>
                        <i className="fas fa-dharmachakra"></i>{" "}
                        {"Automatic"}
                    </li>
                </CarSpecs>

                <Divider />

                <CardOptions>
                    <CarRentWrapper>
                        <span className="rent-amount">
                            <i className="fa-solid fa-dollar-sign"></i>
                            {data.rent_price}
                        </span>{" "}
                        / month
                    </CarRentWrapper>

                    <ButtonGroup>
                        <SaveButton onClick={cardSaveHandler}>
                            {isSaved ? (
                                <i className="fa-solid fa-heart"></i>
                            ) : (
                                <i className="fa-regular fa-heart"></i>
                            )}
                        </SaveButton>

                        <RentButton onClick={onRent}>Rent now</RentButton>
                    </ButtonGroup>
                </CardOptions>
            </CardContent>
        </CardWrapper>
    );
}
