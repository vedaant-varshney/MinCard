import { memo, useCallback, useEffect, useRef, useState } from "react";
import classnames from 'classnames';

import styles from './CardCarousel.module.scss'
import { gsap, Power3 } from "gsap";
import useWindowSize from "@hooks/useWindowSize";


import { EditorState } from 'lexical';

import { useArrayDivRef } from "@hooks/useArrayRef";

import { deck } from "@data/sample-deck";
import Arrow from "@components/Arrow/Arrow";
import { initialPos, getMotionHelper, animateButtonRight, animateButtonLeft } from "./helpers";
import LeftWindow from "@components/LeftWindow/LeftWindow";
import RightWindow from "@components/RightWindow/RightWindow";
import MainEditor from "@components/MainEditor/MainEditor";

export type Props = {
    className?: string;
}

function CardCarousel({ className }: Props) {

    let cards = deck.cards;
    const [cardRefs] = useArrayDivRef()
    const editorRef = useRef<EditorState>();
    const [motionLeft, setMotionLeft] = useState(0);
    const [motionRight, setMotionRight] = useState(0);
    const [readOnly, setReadOnly] = useState(true)
    const [cardTitles, setCardTitles] = useState([""])
    const [allTitles, setAllTitles] = useState([""])
    const [centerIdx, setCenterIdx] = useState(2);
    const [cardCenter, setCardCenter] = useState(2);
    const editorCardRef = useRef<HTMLDivElement>(null);
    const arrowLeftRef = useRef<HTMLDivElement>(null);
    const arrowRightRef = useRef<HTMLDivElement>(null);
    const windowLeftRef = useRef<HTMLDivElement>(null);
    const windowRightRef = useRef<HTMLDivElement>(null);

    const cardIdx = [0, 1, 2, 3, 4];
    const [activeEditor, setActiveEditor] = useState(false)


    let width = useWindowSize();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        let cardTitlesInit: string[] = [];
        for (let i = 0; i < 5; ++i) {
            cardTitlesInit[i] = cards[i].title;
        }
        setCardTitles(cardTitlesInit);

        // add deck to dependencies
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

    function newIndex(centerIdx: number, dir: string) {

        let newIdx;
        if (dir == "left") {
            let center = (cards.length + centerIdx + 1) % cards.length;
            setCenterIdx(center);
            newIdx = (cards.length + center + 2) % cards.length;
            // console.log(newIdx)
        }
        else if (dir == "right") {
            let center = (cards.length + centerIdx - 1) % cards.length;
            newIdx = (cards.length + center - 2) % cards.length;
            // console.log(newIdx)
            setCenterIdx(center);

        }
        return newIdx;


    }

    const animateRight = () => animateButtonRight(cardTitles, newIndex, centerIdx, motionRight, allTitles, setCardTitles, buttonRef, cardRefs, getMotion, setCardCenter, setMotionLeft, setMotionRight);
    const animateLeft = () => animateButtonLeft(cardTitles, newIndex, centerIdx, motionLeft, allTitles, setCardTitles, buttonRef, cardRefs, getMotionLeft, setCardCenter, setMotionLeft, setMotionRight);


    function animateUp() {
        setActiveEditor(!activeEditor)
        // Index of center


        if (!activeEditor) {

            gsap.timeline()
                .to(cardRefs.current[cardCenter], { left: "37.5vw", bottom: "10%", width: "25vw", duration: 1, ease: Power3.easeInOut })
                .to(editorCardRef.current, { autoAlpha: 1, duration: 0.7 }, 1.0)
                .to(windowLeftRef.current, { x: 0, duration: 0.5 }, 0.5)
                .to(windowRightRef.current, { x: 0, duration: 0.5 }, 0.5)
                .to(arrowLeftRef.current, { opacity: 0, display: "none", duration: 0.5 }, 0)
                .to(arrowRightRef.current, { opacity: 0, display: "none", duration: 0.5 }, 0)
            for (let i = 0; i < 5; ++i) {
                if (i !== cardCenter) {
                    gsap.to(cardRefs.current[i], { y: "50vh", duration: 1 })
                }
            }

        }
        else {
            gsap.timeline()
                .to(editorCardRef.current, { autoAlpha: 0, duration: 0.5 })
                .to(cardRefs.current[cardCenter], { left: "39vw", bottom: "-30%", width: "22vw", duration: 1, ease: Power3.easeInOut })
                .to(windowLeftRef.current, { x: "-20vw", duration: 0.5 }, 0)
                .to(windowRightRef.current, { x: "20vw", duration: 0.5 }, 0)
                .to(arrowLeftRef.current, { opacity: 1, display: "initial", duration: 0.5 }, 0.5)
                .to(arrowRightRef.current, { opacity: 1, display: "initial", duration: 0.5 }, 0.5)
            for (let i = 0; i < 5; ++i) {
                if (i !== cardCenter) {
                    gsap.to(cardRefs.current[i], { y: "0", duration: 1 })
                }
            }
        }
    }


    useEffect(() => {
        gsap.timeline()
            .set(editorCardRef.current, { zIndex: 10, autoAlpha: 0, left: "37.5vw", bottom: "10%", width: "25vw" })
            .set(windowLeftRef.current, { x: "-20vw" })
            .set(windowRightRef.current, { x: "20vw" })
    }, [])


    return (
        <div className={classnames(styles.CardCarousel, className)}>
            <LeftWindow ref={windowLeftRef} />
            <RightWindow ref={windowRightRef} />
            {activeEditor &&
                <Arrow onClick={animateUp} className={classnames(styles.arrow, styles.down)} vertical={true} orientation={3} />
            }
            {!activeEditor &&
                <Arrow onClick={animateUp} className={classnames(styles.arrow, styles.up)} vertical={true} orientation={1} />
            }
            <Arrow ref={arrowRightRef} className={classnames(styles.arrow, styles.right)} vertical={false} onClick={animateRight} orientation={-1} />
            <Arrow ref={arrowLeftRef} className={classnames(styles.arrow, styles.left)} vertical={false} onClick={animateLeft} orientation={1} />

            {/* TODO: Separate Editor into new component */}
            <MainEditor ref={editorCardRef} centerIdx={centerIdx} readOnly={readOnly} setReadOnly={setReadOnly} cards={cards} editorRef={editorRef} />
            {cardIdx.map((cardI) => {
                return (
                    <div key={cardI} ref={ref => cardRefs.current[cardI] = ref} className={styles.card}>
                        <h1 className={styles.cardTitle}>{cardTitles[cardI]}</h1>
                        <div className={styles.editor}>
                            <div className={styles.editorInput}>
                            </div>
                        </div>
                    </div>
                );
            })
            }
        </div>
    )
}

export default memo(CardCarousel);