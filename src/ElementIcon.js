import { Element } from './enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt, faSnowflake, faWater } from '@fortawesome/free-solid-svg-icons';

function ElementIcon({ element, size }) {
    let icon;
    switch (element) {
        case Element.FIRE:
            icon = faFireAlt;
            break;
        case Element.WATER:
            icon = faWater;
            break;
        case Element.SNOW:
            icon = faSnowflake;
            break;
    }
    return (
        <FontAwesomeIcon 
            icon={icon}
            fixedWidth
            size={size}
        />
    );
}

export default ElementIcon;
