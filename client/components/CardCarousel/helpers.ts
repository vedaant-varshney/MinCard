// This file can be used later to shorten code in CardCarousel

import { gsap, Power3 } from 'gsap';
import { setCarouselCardTitles, setCarouselCenterIdx, setMotionLeft, setMotionRight } from 'redux/store';


const distanceFromEdgeBottomM = "-30%";
const distanceFromEdgeLR = "5%";
const distanceFromEdgeBottomLR = "-40%";
const offscreenDistanceFromEdgeBottom = "-50%";
const offscreenDistanceFromEdgeLR = "-20%";


function initialPos(cardRefs: any, width: number) {

    if (typeof window !== "undefined") {

        gsap.set(cardRefs.current[3],
            {
                left: "",
                right: distanceFromEdgeLR,
                bottom: distanceFromEdgeBottomLR,
                rotation: 9,
                transformOrigin: "center"
            });
        gsap.set(cardRefs.current[4],
            {
                left: "",
                right: offscreenDistanceFromEdgeLR,
                bottom: offscreenDistanceFromEdgeBottom,
                rotation: 18,
                transformOrigin: "center"
            });
        gsap.set(cardRefs.current[0],
            {
                right: '',
                left: offscreenDistanceFromEdgeLR,
                bottom: offscreenDistanceFromEdgeBottom,
                rotation: -18,
                transformOrigin: "center"
            });


        gsap.set(cardRefs.current[1],
            {
                right: "",
                left: distanceFromEdgeLR,
                bottom: distanceFromEdgeBottomLR,
                rotation: -9,
                transformOrigin: "center"
            });
        gsap.set(cardRefs.current[2],
            {
                left: "",
                right: width / 2 - width * 0.22 / 2,
                bottom: distanceFromEdgeBottomM,
                rotation: 0,
                transformOrigin: "center"
            });
    }

}

function getMotionHelper(movement: number, width: number, left: boolean) {

    let motion = [
        // Off Right 
        {
            left: "",
            right: offscreenDistanceFromEdgeLR,
            bottom: offscreenDistanceFromEdgeBottom,
            rotation: 18,
            duration: 1.0,
            ease: Power3.easeInOut,
        },
        // Off Left
        {
            left: offscreenDistanceFromEdgeLR,
            right: "",
            bottom: offscreenDistanceFromEdgeBottom,
            rotation: -18,
        },
        // Left
        {
            right: "",
            left: distanceFromEdgeLR,
            bottom: distanceFromEdgeBottomLR,
            rotation: -9,
            duration: 1.0,
            ease: Power3.easeInOut,
        },
        // Middle 
        {
            left: "",
            right: width / 2 - width * 0.22 / 2,
            bottom: distanceFromEdgeBottomM,
            rotation: 0,
            duration: 1.0,
            ease: Power3.easeInOut,
        },
        // Right 
        {
            left: "",
            right: distanceFromEdgeLR,
            bottom: distanceFromEdgeBottomLR,
            rotation: 9,
            duration: 1.0,
            ease: Power3.easeInOut,
        }
    ]

    if (left) {
        // Off Right
        motion[0] = {
            left: "",
            right: offscreenDistanceFromEdgeLR,
            bottom: offscreenDistanceFromEdgeBottom,
            rotation: 18,
            // duration: 1.0,
            // ease: Power3.easeInOut,

        }
        // Off Left
        motion[1] = {
            left: offscreenDistanceFromEdgeLR,
            right: "",
            bottom: offscreenDistanceFromEdgeBottom,
            rotation: -18,
            duration: 1.0,
            ease: Power3.easeInOut,
        }
    }

    return motion[movement];


}

function animateButtonLeft(dispatch: any, carouselCardTitles: string[], allCardTitles: string[], newIndex: any, deckCenterIdx: number, motionLeft: number,  buttonRef: any, cardRefs: any, getMotionLeft: any) {

    let titles: string[] = [];
    for (let i in carouselCardTitles) {
        titles[i] = carouselCardTitles[i];
    }
    let animLeftIdx = newIndex(deckCenterIdx, "left")!;

    if (motionLeft == 0) {
        titles[0] = allCardTitles[animLeftIdx];
        dispatch(setCarouselCardTitles(titles))


        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[0], getMotionLeft(0))
            .to(cardRefs.current[1], getMotionLeft(1), 0)
            .to(cardRefs.current[2], getMotionLeft(2), 0.1)
            .to(cardRefs.current[3], getMotionLeft(3), 0.2)
            .to(cardRefs.current[4], getMotionLeft(4), 0.3)
            .set(buttonRef.current, { disabled: false })

        dispatch(setCarouselCenterIdx(3));
        dispatch(setMotionLeft(1));
        dispatch(setMotionRight(4));
    }
    if (motionLeft == 1) {
        titles[1] = allCardTitles[animLeftIdx];
        dispatch(setCarouselCardTitles(titles))

        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[1], getMotionLeft(0))
            .to(cardRefs.current[2], getMotionLeft(1), 0)
            .to(cardRefs.current[3], getMotionLeft(2), 0.1)
            .to(cardRefs.current[4], getMotionLeft(3), 0.2)
            .to(cardRefs.current[0], getMotionLeft(4), 0.3)
            .set(buttonRef.current, { disabled: false })
        dispatch(setCarouselCenterIdx(4));
        dispatch(setMotionLeft(2));
        dispatch(setMotionRight(3));
    }
    if (motionLeft == 2) {
        titles[2] = allCardTitles[animLeftIdx];
        dispatch(setCarouselCardTitles(titles))

        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[2], getMotionLeft(0))
            .to(cardRefs.current[3], getMotionLeft(1), 0)
            .to(cardRefs.current[4], getMotionLeft(2), 0.1)
            .to(cardRefs.current[0], getMotionLeft(3), 0.2)
            .to(cardRefs.current[1], getMotionLeft(4), 0.3)
            .set(buttonRef.current, { disabled: false })
        dispatch(setCarouselCenterIdx(0));
        dispatch(setMotionLeft(3));
        dispatch(setMotionRight(2));
    }
    if (motionLeft == 3) {
        titles[3] = allCardTitles[animLeftIdx];
        dispatch(setCarouselCardTitles(titles))

        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[3], getMotionLeft(0))
            .to(cardRefs.current[4], getMotionLeft(1), 0)
            .to(cardRefs.current[0], getMotionLeft(2), 0.1)
            .to(cardRefs.current[1], getMotionLeft(3), 0.2)
            .to(cardRefs.current[2], getMotionLeft(4), 0.3)
            .set(buttonRef.current, { disabled: false })
        dispatch(setCarouselCenterIdx(1));
        dispatch(setMotionLeft(4));
        dispatch(setMotionRight(1));
    }
    if (motionLeft == 4) {
        titles[4] = allCardTitles[animLeftIdx];
        dispatch(setCarouselCardTitles(titles))

        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[4], getMotionLeft(0))
            .to(cardRefs.current[0], getMotionLeft(1), 0)
            .to(cardRefs.current[1], getMotionLeft(2), 0.1)
            .to(cardRefs.current[2], getMotionLeft(3), 0.2)
            .to(cardRefs.current[3], getMotionLeft(4), 0.3)
            .set(buttonRef.current, { disabled: false })
        dispatch(setCarouselCenterIdx(2));
        dispatch(setMotionLeft(0));
        dispatch(setMotionRight(0));
    }

}

function animateButtonRight(dispatch: any, carouselCardTitles: string[], allCardTitles: string[], newIndex: any, deckCenterIdx: number, motionRight: number, buttonRef: any, cardRefs: any, getMotion: any) {

    let titles: string[] = [];
    for (let i in carouselCardTitles) {
        titles[i] = carouselCardTitles[i];
    }
    let animRightIdx = newIndex(deckCenterIdx, "right")!;

    if (motionRight == 0) {
        titles[4] = allCardTitles[animRightIdx];
        dispatch(setCarouselCardTitles(titles))
        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[4], getMotion(1))
            .to(cardRefs.current[3], getMotion(0), 0)
            .to(cardRefs.current[2], getMotion(4), 0.1)
            .to(cardRefs.current[1], getMotion(3), 0.2)
            .to(cardRefs.current[0], getMotion(2), 0.3)
            .set(buttonRef.current, { disabled: false })

        dispatch(setCarouselCenterIdx(1))
        dispatch(setMotionRight(1))
        dispatch(setMotionLeft(4))
    }
    if (motionRight == 1) {
        titles[3] = allCardTitles[animRightIdx];
        dispatch(setCarouselCardTitles(titles))
        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[3], getMotion(1))
            .to(cardRefs.current[2], getMotion(0), 0)
            .to(cardRefs.current[1], getMotion(4), 0.1)
            .to(cardRefs.current[0], getMotion(3), 0.2)
            .to(cardRefs.current[4], getMotion(2), 0.3)
            .set(buttonRef.current, { disabled: false })

        dispatch(setCarouselCenterIdx(0))
        dispatch(setMotionRight(2))
        dispatch(setMotionLeft(3))
    }
    if (motionRight == 2) {
        titles[2] = allCardTitles[animRightIdx];
        dispatch(setCarouselCardTitles(titles))
        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[2], getMotion(1))
            .to(cardRefs.current[1], getMotion(0), 0)
            .to(cardRefs.current[0], getMotion(4), 0.1)
            .to(cardRefs.current[4], getMotion(3), 0.2)
            .to(cardRefs.current[3], getMotion(2), 0.3)
            .set(buttonRef.current, { disabled: false })

        dispatch(setCarouselCenterIdx(4));
        dispatch(setMotionRight(3));
        dispatch(setMotionLeft(2));
    }
    if (motionRight == 3) {
        titles[1] = allCardTitles[animRightIdx];
        dispatch(setCarouselCardTitles(titles))
        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[1], getMotion(1))
            .to(cardRefs.current[0], getMotion(0), 0)
            .to(cardRefs.current[4], getMotion(4), 0.1)
            .to(cardRefs.current[3], getMotion(3), 0.2)
            .to(cardRefs.current[2], getMotion(2), 0.3)
            .set(buttonRef.current, { disabled: false })

        dispatch(setCarouselCenterIdx(3))
        dispatch(setMotionRight(4))
        dispatch(setMotionLeft(1))
    }
    if (motionRight == 4) {
        titles[0] = allCardTitles[animRightIdx];
        dispatch(setCarouselCardTitles(titles))
        gsap.timeline()
            .set(buttonRef.current, { disabled: true })
            .set(cardRefs.current[0], getMotion(1))
            .to(cardRefs.current[4], getMotion(0), 0)
            .to(cardRefs.current[3], getMotion(4), 0.1)
            .to(cardRefs.current[2], getMotion(3), 0.2)
            .to(cardRefs.current[1], getMotion(2), 0.3)
            .set(buttonRef.current, { disabled: false })

        dispatch(setCarouselCenterIdx(2))
        dispatch(setMotionRight(0))
        dispatch(setMotionLeft(0))
    }
}

export { initialPos, getMotionHelper, animateButtonRight, animateButtonLeft }