import { memo, useState, useRef, useEffect, forwardRef } from "react";
import classnames from 'classnames';
import { gsap, Power3 } from 'gsap';
import styles from './Arrow.module.scss'
import { NodeNextRequest } from "next/dist/server/base-http/node";


export type Props = {
    className?: string;
    onClick?: () => void;
    orientation: number;
    vertical: boolean;
    // orientationY: 1 | -1;
}

const Arrow = forwardRef(({className, onClick, orientation, vertical } : Props, ref: any) => {


    const arrow = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (vertical) {
            let timeline = gsap.timeline()
                .set(arrow.current, { rotateZ: 90 * orientation })
            // .to(arrow.current, {
            //     duration: 1,
            //     y: 25,
            //     yoyo: true,
            //     repeat: -1,
            //     ease: Power3.easeOut
            // })
            timeline.play()


        }
        else {

            let timeline = gsap.timeline()
                .set(arrow.current, { scaleX: orientation })
                .to(arrow.current, {
                    duration: 1,
                    x: orientation * 25,
                    yoyo: true,
                    repeat: -1,
                    ease: Power3.easeOut
                })

            timeline.play()
        }
    }, [])

    function arrowMouseEnter() {
        let timeline = gsap.timeline();
        timeline.to(arrow.current, { fill: "#555555", duration: 0.4 })

    }

    function arrowMouseLeave() {
        gsap.timeline()
            .to(arrow.current, { fill: "#222222", duration: 0.4 })
    }


    return (
        <div ref={ref} onClick={onClick} className={classnames(styles.Arrow, className)}>

            <svg ref={arrow} onMouseEnter={arrowMouseEnter} onMouseLeave={arrowMouseLeave} className={classnames(styles.color)} width="49" height="83" viewBox="0 0 49 83" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.7422 36.851C-0.527012 39.0151 -0.587322 42.5833 1.60744 44.8207L37.3743 81.2822C39.5692 83.5196 43.188 83.5791 45.4572 81.4151C47.7265 79.2509 47.7868 75.6828 45.592 73.4453L13.7992 41.0351L46.6697 9.68751C48.9389 7.52342 48.9992 3.95525 46.8044 1.71779C44.6096 -0.519674 40.9907 -0.579143 38.7215 1.58496L1.7422 36.851ZM14.386 35.4078L5.81161 35.2669L5.62098 46.5377L14.1954 46.6786L14.386 35.4078Z" />
            </svg>


        </div>
    );
})

export default memo(Arrow);