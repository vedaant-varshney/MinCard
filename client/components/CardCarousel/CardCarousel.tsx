import { memo, useCallback, useEffect, useRef, useState } from "react";
import classnames from 'classnames';

import styles from './CardCarousel.module.scss'
import { gsap, Power3 } from "gsap";
import useWindowSize from "@hooks/useWindowSize";


import { $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical';

import LexicalComposer from '@lexical/react/LexicalComposer';
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useArrayDivRef, useArrayEditorRef } from "@hooks/useArrayRef";
import MakeReadOnly from "@components/plugins/MakeReadOnly";

import { deck } from "@data/sample-deck";
import Arrow from "@components/Arrow/Arrow";
import { initialPos, getMotionHelper } from "./helpers";

export type Props = {
    className?: string;
}

function CardCarousel({ className }: Props) {

    let cards = deck.cards;
    const [cardRefs] = useArrayDivRef()
    const [editorRefs] = useArrayEditorRef();
    const [motion, setMotion] = useState(0);
    const [motionLeft, setMotionLeft] = useState(0);
    const [motionRight, setMotionRight] = useState(0);
    const [readOnly, setReadOnly] = useState(false)
    const [cardTitles, setCardTitles] = useState([""])
    const [allTitles, setAllTitles] = useState([""])
    const [animRightIdx, setAnimRightIdx] = useState(cards.length - 1)
    const [animLeftIdx, setAnimLeftIdx] = useState(5)
    const [centerIdx, setCenterIdx] = useState(2);

    const cardIdx = [0, 1, 2, 3, 4];


    let width = useWindowSize();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        let cardTitlesInit: string[] = [];
        let allTitlesInit: string[] = [];
        for (let i = 0; i < 5; ++i) {
            cardTitlesInit[i] = cards[i].title;
        }
        for (let i = 0; i < cards.length; ++i) {
            allTitlesInit[i] = cards[i].title
        }
        setCardTitles(cardTitlesInit);
        setAllTitles(allTitlesInit)

    }, [deck])

    useEffect(() => {
        initialPos(cardRefs, width);
    }, [width])

    function getMotion(movement: number) {
        return getMotionHelper(movement, width, false);
    }

    function getMotionLeft(movement: number) {
        return getMotionHelper(movement, width, true);

    }


    const theme = {}
    function onError(error: any) {
        console.error(error);
    }

    const initialConfig = {
        theme,
        onError
    }

    function newIndexRight(prevOffLeft: number) {
        let newInd = prevOffLeft - 1
        if (newInd < 0) newInd = cards.length - 1;

        let newLeft = animLeftIdx - 2;
        newLeft = newLeft % cards.length;
        setAnimLeftIdx(newLeft);

        return newInd;
    }

    function newIndexLeft(prevOffRight: number) {
        let newInd = prevOffRight + 1

        let newRight = animRightIdx + 2;
        newRight = newRight % cards.length;
        setAnimRightIdx(newRight);

        if (newInd > cards.length - 1) newInd = 0;
        return newInd;

    }

    function newIndex(centerIdx: number, dir: string) {

        let newIdx;
        if (dir == "left") {
            let center = (cards.length + centerIdx + 1) % cards.length;
            setCenterIdx(center);
            newIdx =  (cards.length + center + 2) % cards.length;
            console.log(newIdx)


        }
        else if (dir == "right") {
            let center = (cards.length+ centerIdx - 1) % cards.length;
            newIdx = (cards.length + center - 2) % cards.length;
            console.log(newIdx)
            setCenterIdx(center);

        }
        return newIdx;


    }

    // I believe that this code can't be shortened due to ref restrictions
    function animateButtonRight() {
        let titles = cardTitles;
        let animRightIdx = newIndex(centerIdx, "right")!;

        if (motionRight == 0) {
            titles[4] = allTitles[animRightIdx];
            setCardTitles(titles)
            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[4], getMotion(1))
                .to(cardRefs.current[3], getMotion(0), 0)
                .to(cardRefs.current[2], getMotion(4), 0.1)
                .to(cardRefs.current[1], getMotion(3), 0.2)
                .to(cardRefs.current[0], getMotion(2), 0.3)
                .set(buttonRef.current, { disabled: false })

            setMotionRight(1)
            setMotionLeft(4)
        }
        if (motionRight == 1) {
            titles[3] = allTitles[animRightIdx];
            setCardTitles(titles)
            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[3], getMotion(1))
                .to(cardRefs.current[2], getMotion(0), 0)
                .to(cardRefs.current[1], getMotion(4), 0.1)
                .to(cardRefs.current[0], getMotion(3), 0.2)
                .to(cardRefs.current[4], getMotion(2), 0.3)
                .set(buttonRef.current, { disabled: false })

            setMotionRight(2)
        }
        if (motionRight == 2) {
            titles[2] = allTitles[animRightIdx];
            setCardTitles(titles)
            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[2], getMotion(1))
                .to(cardRefs.current[1], getMotion(0), 0)
                .to(cardRefs.current[0], getMotion(4), 0.1)
                .to(cardRefs.current[4], getMotion(3), 0.2)
                .to(cardRefs.current[3], getMotion(2), 0.3)
                .set(buttonRef.current, { disabled: false })

            setMotionRight(3)
        }
        if (motionRight == 3) {
            titles[1] = allTitles[animRightIdx];
            setCardTitles(titles)
            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[1], getMotion(1))
                .to(cardRefs.current[0], getMotion(0), 0)
                .to(cardRefs.current[4], getMotion(4), 0.1)
                .to(cardRefs.current[3], getMotion(3), 0.2)
                .to(cardRefs.current[2], getMotion(2), 0.3)
                .set(buttonRef.current, { disabled: false })

            setMotionRight(4)
        }
        if (motionRight == 4) {
            titles[0] = allTitles[animRightIdx];
            setCardTitles(titles)
            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[0], getMotion(1))
                .to(cardRefs.current[4], getMotion(0), 0)
                .to(cardRefs.current[3], getMotion(4), 0.1)
                .to(cardRefs.current[2], getMotion(3), 0.2)
                .to(cardRefs.current[1], getMotion(2), 0.3)
                .set(buttonRef.current, { disabled: false })

            setMotionRight(0)
        }
    }

    function animateButtonLeft() {
        let titles = cardTitles;
        let animLeftIdx = newIndex(centerIdx, "left")!;

        if (motionLeft == 0) {
            titles[0] = allTitles[animLeftIdx];

            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[0], getMotionLeft(0))
                .to(cardRefs.current[1], getMotionLeft(1), 0)
                .to(cardRefs.current[2], getMotionLeft(2), 0.1)
                .to(cardRefs.current[3], getMotionLeft(3), 0.2)
                .to(cardRefs.current[4], getMotionLeft(4), 0.3)
                .set(buttonRef.current, { disabled: false })
            setMotionLeft(1);
        }
        if (motionLeft == 1) {
            titles[1] = allTitles[animLeftIdx];

            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[1], getMotionLeft(0))
                .to(cardRefs.current[2], getMotionLeft(1), 0)
                .to(cardRefs.current[3], getMotionLeft(2), 0.1)
                .to(cardRefs.current[4], getMotionLeft(3), 0.2)
                .to(cardRefs.current[0], getMotionLeft(4), 0.3)
                .set(buttonRef.current, { disabled: false })
            setMotionLeft(2);
        }
        if (motionLeft == 2) {
            titles[2] = allTitles[animLeftIdx];

            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[2], getMotionLeft(0))
                .to(cardRefs.current[3], getMotionLeft(1), 0)
                .to(cardRefs.current[4], getMotionLeft(2), 0.1)
                .to(cardRefs.current[0], getMotionLeft(3), 0.2)
                .to(cardRefs.current[1], getMotionLeft(4), 0.3)
                .set(buttonRef.current, { disabled: false })
            setMotionLeft(3);
        }
        if (motionLeft == 3) {
            titles[3] = allTitles[animLeftIdx];

            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[3], getMotionLeft(0))
                .to(cardRefs.current[4], getMotionLeft(1), 0)
                .to(cardRefs.current[0], getMotionLeft(2), 0.1)
                .to(cardRefs.current[1], getMotionLeft(3), 0.2)
                .to(cardRefs.current[2], getMotionLeft(4), 0.3)
                .set(buttonRef.current, { disabled: false })
            setMotionLeft(4);
        }
        if (motionLeft == 4) {
            titles[4] = allTitles[animLeftIdx];

            gsap.timeline()
                .set(buttonRef.current, { disabled: true })
                .set(cardRefs.current[4], getMotionLeft(0))
                .to(cardRefs.current[0], getMotionLeft(1), 0)
                .to(cardRefs.current[1], getMotionLeft(2), 0.1)
                .to(cardRefs.current[2], getMotionLeft(3), 0.2)
                .to(cardRefs.current[3], getMotionLeft(4), 0.3)
                .set(buttonRef.current, { disabled: false })
            setMotionLeft(0);
        }

    }



    function animateUp() {
        // Index of center 
        let center = Math.abs(motion - 4)
        // Updating left recenters card with new width
        gsap.to(cardRefs.current[center], { left: "37.5vw", bottom: "10%", width: "25vw", duration: 1.2, ease: Power3.easeInOut })
    }

    function getState() {
        console.log(JSON.stringify(editorRefs.current[Math.abs(motion - 4)]));
    }



    return (
        <div className={classnames(styles.CardCarousel, className)}>
            <Arrow className={classnames(styles.arrow, styles.right)} onClick={animateButtonRight} orientationX={-1} />
            <Arrow className={classnames(styles.arrow, styles.left)} onClick={animateButtonLeft} orientationX={1} />
            <button ref={buttonRef} onClick={animateButtonRight}>Move</button>
            <button onClick={getState}>Get State</button>
            <button onClick={animateUp}>Animate Up</button>
            {cardIdx.map((cardI) => {
                return (
                    <div key={cardI} ref={ref => cardRefs.current[cardI] = ref} className={styles.card}>
                        <h1 className={styles.cardTitle}>{cardTitles[cardI]}</h1>
                        <LexicalComposer initialConfig={initialConfig}>
                            <div className={styles.editor}>
                                <RichTextPlugin
                                    placeholder={<div className={styles.placeholder}>Click on the card and start typing!</div>}
                                    contentEditable={<LexicalContentEditable className={styles.editorInput} />}
                                />
                                <LexicalOnChangePlugin onChange={editorState => editorRefs.current[cardI] = editorState} />
                                <HistoryPlugin />
                                <MakeReadOnly isReadOnly={readOnly} />
                            </div>
                        </LexicalComposer>
                    </div>
                );
            })

            }
        </div>
    )
}

export default memo(CardCarousel);