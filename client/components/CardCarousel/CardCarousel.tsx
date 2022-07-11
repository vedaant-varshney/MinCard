import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import classnames from 'classnames';

import styles from './CardCarousel.module.scss'
import { gsap, Power3 } from "gsap";
import useWindowSize from "@hooks/useWindowSize";


import { EditorState } from 'lexical';
import { useArrayDivRef } from "@hooks/useArrayRef";
import { importDeck } from "@data/sample-deck";
import Arrow from "@components/Arrow/Arrow";
import { initialPos, getMotionHelper, animateButtonRight, animateButtonLeft } from "./helpers";
import LeftWindow from "@components/LeftWindow/LeftWindow";
import RightWindow from "@components/RightWindow/RightWindow";
import MainEditor from "@components/MainEditor/MainEditor";

import { useAppSelector, useAppDispatch } from "@hooks/reduxHooks";
import { DeckCtx } from "redux/deckContext";
import { setAllCardTitles, setCarouselCardTitles, setDeckCenterIdx, setAllCardDescriptions, setCarouselCardDescriptions } from "redux/store";

export type Props = {
    className?: string;
}

function CardCarousel({ className }: Props) {

    const cardIdx = [0, 1, 2, 3, 4];



    // States
    // const [readOnly, setReadOnly] = useState(false)
    const [activeEditor, setActiveEditor] = useState(false)

    // Refs
    const editorCardRef = useRef<HTMLDivElement>(null);
    const arrowLeftRef = useRef<HTMLDivElement>(null);
    const arrowRightRef = useRef<HTMLDivElement>(null);
    const windowLeftRef = useRef<HTMLDivElement>(null);
    const windowRightRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<EditorState>();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [cardRefs] = useArrayDivRef()



    // Redux 
    const dispatch = useAppDispatch();
    const allCardTitles = useAppSelector((state) => state.allCardTitles)
    const carouselCardTitles = useAppSelector((state) => state.carouselCardTitles)
    const carouselCenterIdx = useAppSelector((state) => state.carouselCenterIdx)
    const carouselCardDescriptions = useAppSelector((state) => state.carouselCardDescriptions)
    const allCardDescriptions = useAppSelector((state) => state.allCardDescriptions)
    const deckCenterIdx = useAppSelector((state) => state.deckCenterIdx)

    const motionLeft = useAppSelector((state) => state.motionLeft)
    const motionRight = useAppSelector((state) => state.motionRight)
    // const deck: Deck  = useAppSelector((state) => state.deck);
    const [deck, setDeck] = useContext(DeckCtx)



    let width = useWindowSize();

    useEffect(() => {
        if (deck !== null && deck !== undefined) {
            console.log(deck);
            // let cards = deck.cards;
            let cardTitlesInit: string[] = [];
            let allTitlesInit: string[] = [];
            let cardDescriptionsInit: string[] = [];
            let allDescriptionsInit: string[] = [];

            for (let i = 0; i < 5; ++i) {
                cardTitlesInit[i] = deck.cards[i].title;
                cardDescriptionsInit[i] = deck.cards[i].description;
            }
            for (let i = 0; i < deck.cards.length; ++i) {
                allTitlesInit[i] = deck.cards[i].title;
                allDescriptionsInit[i] = deck.cards[i].description;
            }
            dispatch(setCarouselCardTitles(cardTitlesInit))
            dispatch(setAllCardTitles(allTitlesInit))
            dispatch(setCarouselCardDescriptions(cardDescriptionsInit))
            dispatch(setAllCardDescriptions(allDescriptionsInit))


        }



        // add deck to dependencies
    }, [deck])

    useEffect(() => {
        initialPos(cardRefs, width);
    }, [width])


    // TODO: move to helpers
    function getMotion(movement: number) {
        return getMotionHelper(movement, width, false);
    }
    // TODO: move to helpers
    function getMotionLeft(movement: number) {
        return getMotionHelper(movement, width, true);
    }

    // TODO: move to helpers
    function newIndex(deckCenterIdx: number, dir: string) {
        let cards = deck.cards;

        let newIdx;
        if (dir == "left") {
            let center = (cards.length + deckCenterIdx + 1) % cards.length;
            dispatch(setDeckCenterIdx(center));
            newIdx = (cards.length + center + 2) % cards.length;
            // console.log(newIdx)
        }
        else if (dir == "right") {
            let center = (cards.length + deckCenterIdx - 1) % cards.length;
            newIdx = (cards.length + center - 2) % cards.length;
            // console.log(newIdx)
            dispatch(setDeckCenterIdx(center));

        }
        return newIdx;


    }

    // TODO: put all card-specific info (title/description/etc) in a singular object
    const animateRight = () => animateButtonRight(dispatch, carouselCardTitles, allCardTitles, newIndex, deckCenterIdx, motionRight, buttonRef, cardRefs, getMotion);
    const animateLeft = () => animateButtonLeft(dispatch, carouselCardTitles, allCardTitles, newIndex, deckCenterIdx, motionLeft, buttonRef, cardRefs, getMotionLeft);

    // TODO: move to helpers
    function animateUp() {
        setActiveEditor(!activeEditor)

        if (!activeEditor) {

            gsap.timeline()
                .to(cardRefs.current[carouselCenterIdx], { left: "37.5vw", bottom: "10%", width: "25vw", duration: 1, ease: Power3.easeInOut })
                .to(editorCardRef.current, { autoAlpha: 1, duration: 0.7 }, 1.0)
                .to(windowLeftRef.current, { x: 0, duration: 0.5 }, 0.5)
                .to(windowRightRef.current, { x: 0, duration: 0.5 }, 0.5)
                .to(arrowLeftRef.current, { opacity: 0, display: "none", duration: 0.5 }, 0)
                .to(arrowRightRef.current, { opacity: 0, display: "none", duration: 0.5 }, 0)
            for (let i = 0; i < 5; ++i) {
                if (i !== carouselCenterIdx) {
                    gsap.to(cardRefs.current[i], { y: "50vh", duration: 1 })
                }
            }

        }
        else {
            gsap.timeline()
                .to(editorCardRef.current, { autoAlpha: 0, duration: 0.5 })
                .to(cardRefs.current[carouselCenterIdx], { left: "39vw", bottom: "-30%", width: "22vw", duration: 1, ease: Power3.easeInOut })
                .to(windowLeftRef.current, { x: "-20vw", duration: 0.5 }, 0)
                .to(windowRightRef.current, { x: "20vw", duration: 0.5 }, 0)
                .to(arrowLeftRef.current, { opacity: 1, display: "initial", duration: 0.5 }, 0.5)
                .to(arrowRightRef.current, { opacity: 1, display: "initial", duration: 0.5 }, 0.5)
            for (let i = 0; i < 5; ++i) {
                if (i !== carouselCenterIdx) {
                    gsap.to(cardRefs.current[i], { y: "0", duration: 1 })
                }
            }
        }
    }

    useEffect(() => {
        // Sets the initial deck and states based on API requests 
        // TODO: Put this at a higher level so everything loads before the cards render
        setDeck(importDeck)


        // Sets the initial state for the editor and side windows
        gsap.timeline()
            .set(editorCardRef.current, { zIndex: 10, autoAlpha: 0, left: "37.5vw", bottom: "10%", width: "25vw" })
            .set(windowLeftRef.current, { x: "-20vw" })
            .set(windowRightRef.current, { x: "20vw" })
    }, [deck])

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

            <MainEditor ref={editorCardRef} centerIdx={deckCenterIdx} editorRef={editorRef} />

            {cardIdx.map((cardI) => {
                return (
                    <div key={cardI} ref={ref => cardRefs.current[cardI] = ref} className={styles.card}>
                        <h1 className={styles.cardTitle}>{carouselCardTitles[cardI]}</h1>
                        <div className={styles.editor}>
                            <div className={styles.editorInput}>
                                <p>{carouselCardDescriptions[cardI]}</p>
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