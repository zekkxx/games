import "./styles.css";

interface gameCardProps {
    name: string;
    onClick: (name: string) => void;
}

function GameCard(props: gameCardProps) {
    return(
        <img
            src={`${import.meta.env.BASE_URL}/images/constellations/${props.name}.jpg`}
            alt={props.name+" constellation"}
            onClick={() => props.onClick(props.name)}
        />
    );
}

export default GameCard;