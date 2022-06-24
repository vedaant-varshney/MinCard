import { memo, useCallback, useEffect, useRef, useState } from "react";
import classnames from 'classnames';

import styles from './CardCarousel.module.scss'
import { gsap, Power3 } from "gsap";
import useWindowSize from "@hooks/useWindowSize";


import { $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical';

import LexicalComposer from '@lexical/react/LexicalComposer';
// import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';



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
    const buttonRef = useRef<HTMLButtonElement>(null);

    const distanceFromEdgeBottomM = "-40%";
    const distanceFromEdgeLR = "5%";
    const distanceFromEdgeBottomLR = "-50%";
    const offscreenDistanceFromEdgeBottom = "-70%";
    const offscreenDistanceFromEdgeLR = "-20%";

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

    const [rightDisabled, setRightDisabled] = useState(false);


    const animateButtonRight = () => {        gsap.timeline({
            onComplete: () => {
                tempDiv = cardFiveRef;
                cardFiveRef = cardThreeRef;
                cardThreeRef = cardOneRef;
                cardOneRef = cardTwoRef;
                cardTwoRef = cardFourRef;
                cardFourRef = tempDiv;
            }
        })
            .set(buttonRef.current, { disabled: true })
            .to(cardThreeRef.current, { left: "", right: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: 18, duration: 1.0, ease: Power3.easeInOut, transformOrigin: "right 50%" })
            .set(cardThreeRef.current, { left: offscreenDistanceFromEdgeLR, right: "", bottom: offscreenDistanceFromEdgeBottom, rotation: -18, transformOrigin: "left 50%" })
            .to(cardOneRef.current, { left: "", right: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: 9, duration: 1.0, ease: Power3.easeInOut, transformOrigin: "right 50%", delay: 0.1 }, 0)
            .to(cardTwoRef.current, { right: "", left: width / 2 - width * 0.22 / 2, bottom: distanceFromEdgeBottomM, rotation: 0, duration: 1.0, ease: Power3.easeInOut, delay: 0.2 }, 0)
            .to(cardFourRef.current, { right: "", left: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: -9, duration: 1.0, ease: Power3.easeInOut, delay: 0.3, transformOrigin: "left 50%" }, 0)
            .set(buttonRef.current, { disabled: false })
    }


    


    return (
        <div className={classnames(styles.CardCarousel, className)}>
            <button ref={buttonRef} onClick={() => animateButtonRight()}>Move</button>
            <div ref={cardOneRef} className={styles.card}><h1>This is main initial text</h1></div>
            <div ref={cardTwoRef} className={styles.card}><h1>This is left initial text</h1></div>
            <div ref={cardThreeRef} className={styles.card}><h1>This is right initial text</h1></div>
            <div ref={cardFourRef} className={styles.card}><h1>This is offscreen left initial text</h1></div>
            <div ref={cardFiveRef} className={styles.card}><h1>This is offscreen right initial text</h1></div>
        </div>
    )
}

export default memo(CardCarousel);