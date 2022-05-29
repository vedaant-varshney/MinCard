import { memo, useEffect, useRef } from "react";
import classnames from 'classnames';

import styles from './CardAnim.module.scss'
import {gsap, Power3, Linear} from "gsap";


export type Props = {
    className?: string;
}

function CardAnim({className}: Props) {

    const cardOne = useRef<HTMLDivElement>(null);
    const cardTwo = useRef<HTMLDivElement>(null);
    const cardThree = useRef<HTMLDivElement>(null);

    useEffect(() => {

        gsap.set(cardThree.current, {top: "+="+20, "z-index": 10, })
        gsap.set(cardTwo.current, {top: "+="+10, "z-index": 15})
        gsap.set(cardOne.current, {"z-index":20}) 
    }, [])

    function animation() {

        gsap.to(cardOne.current, {x:350, rotateX:0, rotateZ:0,  duration: 2, ease: gsap.parseEase("0,0.25,0.5,0.75,1")} )
    }

    return (
        <div className={classnames(styles.CardAnim, className)}>
            <div ref={cardOne} className={styles.smCard}><h1>This is the first Card</h1></div>
            <div ref={cardTwo} className={styles.smCard}><h1>This is the second Card</h1></div>
            <div ref={cardThree} className={styles.smCard}><h1>This is the third Card</h1></div>
            <button className={styles.buttonStyle} onClick={animation}>Trigger Animation</button>
        </div>
    );
}

export default memo(CardAnim);