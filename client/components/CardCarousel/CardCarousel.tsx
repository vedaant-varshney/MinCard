import { memo, useEffect, useRef, useState } from "react";
import classnames from 'classnames';

import styles from './CardCarousel.module.scss'
import { gsap, Power3 } from "gsap";
import useWindowSize from "@hooks/useWindowSize";

export type Props = {
    className?: string;
}

function CardCarousel({ className }: Props) {

    // Middle Card
    let cardOneRef = useRef<HTMLDivElement>(null);
    // Left Card
    let cardTwoRef = useRef<HTMLDivElement>(null);
    // Right Card
    let cardThreeRef = useRef<HTMLDivElement>(null);
    // Left Offscreen Card
    let cardFourRef = useRef<HTMLDivElement>(null);
    // Right Offscreen Card
    let cardFiveRef = useRef<HTMLDivElement>(null);
    let tempDiv = useRef<HTMLDivElement>(null);
    let width = useWindowSize();
    // const posFour = {};
    // const posFive = {};

    const distanceFromEdgeBottomM = "-40%";
    const distanceFromEdgeLR = "5%";
    const distanceFromEdgeBottomLR = "-50%";
    const offscreenDistanceFromEdgeBottom = "-70%";
    const offscreenDistanceFromEdgeLR = "-20%";


    const [rightDisabled, setRightDisabled] = useState(false);

    // Have this update on screen width change
    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.set(cardOneRef.current, { left: width / 2 - width * 0.22 / 2, bottom: distanceFromEdgeBottomM, rotation: 0 });
            gsap.set(cardTwoRef.current, { left: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: -9, transformOrigin: "left 50%" });
            gsap.set(cardThreeRef.current, { right: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: 9, transformOrigin: "right 50%" });
            gsap.set(cardFourRef.current, { left: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: -18, transformOrigin: "left 50%" });
            gsap.set(cardFiveRef.current, { right: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: 18, transformOrigin: "right 50%" });
        }
    }, [width])

    // function animateButtonLeft() {
    //     gsap.timeline() 
    //         .to(cardTwoRef, {left: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: -18, duration: 1.2, ease: Power3.easeInOut})
    //         .to(cardOneRef, {left: distanceFromEdgeLR, right: "",  bottom: offscreenDistanceFromEdgeLR, rotation: -9, duration: 1.2, ease: Power3.easeInOut, delay: 0.2})
    //         .to(cardTwoRef, {left: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: -18, duration: 1.2, ease: Power3.easeInOut, delay: 0.4})
    //         .to(cardTwoRef, {left: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: -18, duration: 1.2, ease: Power3.easeInOut, delay: 0.6})
    // }

    function animateButtonRight() {
        gsap.timeline({ 
            onStart: () => setRightDisabled(true), 
            onComplete: () => {
                tempDiv = cardFiveRef;
                cardFiveRef = cardThreeRef;
                cardThreeRef = cardOneRef;
                cardOneRef = cardTwoRef;
                cardTwoRef = cardFourRef;
                cardFourRef = tempDiv;
                setRightDisabled(false);
        }})
            .to(cardThreeRef.current, { left: "", right: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: 18, duration: 1.2, ease: Power3.easeInOut, transformOrigin: "right 50%" })
            .set(cardThreeRef.current, { left: offscreenDistanceFromEdgeLR, right: "", bottom: offscreenDistanceFromEdgeBottom, rotation: -18, transformOrigin: "left 50%" })
            .to(cardOneRef.current, { left: "", right: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: 9, duration: 1.2, ease: Power3.easeInOut, transformOrigin: "right 50%", delay: 0.2 }, 0)
            .to(cardTwoRef.current, { right: "", left: width / 2 - width * 0.22 / 2, bottom: distanceFromEdgeBottomM, rotation: 0, duration: 1.2, ease: Power3.easeInOut, delay: 0.4 }, 0)
            .to(cardFourRef.current, { right: "", left: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: -9, duration: 1.2, ease: Power3.easeInOut, delay: 0.6, transformOrigin: "left 50%" }, 0) 
    }


    return (
        <div className={classnames(styles.CardCarousel, className)}>
            <button  onClick={animateButtonRight}>Bingo Bongo</button>
            <div ref={cardOneRef} className={styles.card}><h1>This is main initial text</h1></div>
            <div ref={cardTwoRef} className={styles.card}><h1>This is left initial text</h1></div>
            <div ref={cardThreeRef} className={styles.card}><h1>This is right initial text</h1></div>
            <div ref={cardFourRef} className={styles.card}><h1>This is offscreen left initial text</h1></div>
            <div ref={cardFiveRef} className={styles.card}><h1>This is offscreen right initial text</h1></div>
            {/* <div ref={cardOneRef} className={styles.card}/>
            <div ref={cardOneRef} className={styles.card}/> */}
        </div>
    )
}

export default memo(CardCarousel);