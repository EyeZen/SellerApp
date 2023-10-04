import styled from "styled-components";

const LoadingWrapper = styled.div`
    width: 200px;
    height: 200px;
    left: 0;
    right: 0;
    margin-inline: auto;
    top: 0;
    bottom: 0;
    margin-block: auto;

    border-radius: 50%;
    border-top: 20px solid ${(props) => props.theme.colors.icon};
    background-color: white;
    animation: loadingAnimation 1000ms linear infinite;
    box-shadow: 0 0 5px #c0c0c0;

    display: grid;
    place-items: center;
    & span {
        animation: loadingReverseAnimation 1000ms linear infinite;
    }

    @keyframes loadingAnimation {
        from {
            rotate: 0deg;
        }
        to {
            rotate: 360deg;
        }
    }

    @keyframes loadingReverseAnimation {
        from {
            rotate: 0deg;
        }
        to {
            rotate: -360deg;
        }
    }
`;

export default function LoadingIndicator() {
    return (
        <LoadingWrapper>
            <span>Loading...</span>
        </LoadingWrapper>
    );
}