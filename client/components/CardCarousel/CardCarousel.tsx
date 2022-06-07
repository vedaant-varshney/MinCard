import { memo } from "react";
import classnames from 'classnames';

import styles from './CardCarousel.module.scss'


export type Props = {
    className?: string;
}

function CardCarousel({className}: Props) {
    return (
        <div className={classnames(styles.CardCarousel, className)}></div>
    );
}

export default memo(CardCarousel);