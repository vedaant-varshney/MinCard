// This file can be used later to shorten code in CardCarousel

import {gsap, Power3} from 'gsap';

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

function getMotionHelper(movement: number, width: number, left:boolean) {

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
export { initialPos, getMotionHelper }