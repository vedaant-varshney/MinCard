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
import { useArrayDivRef, useArrayEditorRef } from "@hooks/useArrayRef";
// import MakeReadOnly from "@components/plugins/MakeReadOnly";


export type Props = {
    className?: string;
}

function CardCarousel({ className }: Props) {

    const [cardRefs] = useArrayDivRef()
    const [editorRefs] = useArrayEditorRef();
    const editorStateRef = useRef<EditorState>();


    let width = useWindowSize();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const distanceFromEdgeBottomM = "-30%";
    const distanceFromEdgeLR = "5%";
    const distanceFromEdgeBottomLR = "-40%";
    const offscreenDistanceFromEdgeBottom = "-50%";
    const offscreenDistanceFromEdgeLR = "-20%";

    const [motion, setMotion] = useState(0);


    // [4, 2, 1, 3, 5]
    // Initial card positions
    useEffect(() => {


        if (typeof window !== "undefined") {

            gsap.set(cardRefs.current[0],
                {
                    left: "",
                    right: distanceFromEdgeLR,
                    bottom: distanceFromEdgeBottomLR,
                    rotation: 9,
                    transformOrigin: "center"
                });
            gsap.set(cardRefs.current[1],
                {
                    left: "",
                    right: offscreenDistanceFromEdgeLR,
                    bottom: offscreenDistanceFromEdgeBottom,
                    rotation: 18,
                    transformOrigin: "center"
                });
            gsap.set(cardRefs.current[2],
                {
                    left: offscreenDistanceFromEdgeLR,
                    bottom: offscreenDistanceFromEdgeBottom,
                    rotation: -18,
                    transformOrigin: "center"
                });


            gsap.set(cardRefs.current[3],
                {
                    left: distanceFromEdgeLR,
                    bottom: distanceFromEdgeBottomLR,
                    rotation: -9,
                    transformOrigin: "center"
                });
            gsap.set(cardRefs.current[4],
                {
                    left: "",
                    right: width / 2 - width * 0.22 / 2,
                    bottom: distanceFromEdgeBottomM,
                    rotation: 0,
                    transformOrigin: "center"
                });
        }
        // animateButtonRight();
    }, [width])


    // Pass in the 
    function getMotion(movement: number) {

        let motion = [
            // Right to Off Right 
            {
                left: "",
                right: offscreenDistanceFromEdgeLR,
                bottom: offscreenDistanceFromEdgeBottom,
                rotation: 18,
                duration: 1.0,
                ease: Power3.easeInOut,
            },
            // Off Right to Off Left
            {
                left: offscreenDistanceFromEdgeLR,
                right: "",
                bottom: offscreenDistanceFromEdgeBottom,
                rotation: -18,
            },
            // Off Left To Left
            {
                right: "",
                left: distanceFromEdgeLR,
                bottom: distanceFromEdgeBottomLR,
                rotation: -9,
                duration: 1.0,
                ease: Power3.easeInOut,
            },
            // Left to Middle
            {
                left: "",
                right: width / 2 - width * 0.22 / 2,
                bottom: distanceFromEdgeBottomM,
                rotation: 0,
                duration: 1.0,
                ease: Power3.easeInOut,
            },
            // Middle to Right
            {
                left: "",
                right: distanceFromEdgeLR,
                bottom: distanceFromEdgeBottomLR,
                rotation: 9,
                duration: 1.0,
                ease: Power3.easeInOut,
            }
        ]

        return motion[movement];


    }



    const theme = {}
    function onError(error: any) {
        console.error(error);
    }


    const initialConfig = {
        theme,
        onError
    }




    const [readOnly, setReadOnly] = useState(false)

    interface ReadOnlyProps {
        isReadOnly: boolean
    }
    function MakeReadOnly({ isReadOnly }: ReadOnlyProps) {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
            editor.setReadOnly(isReadOnly)
        },
            [isReadOnly])
        return null;
    }

    // 0 is reserved for the temporary index
    const cardIdx = [0, 1, 2, 3, 4]

    function animateButtonRight() {
        // Default position
        if (motion == 0) {
            gsap.timeline()
                .to(cardRefs.current[0], getMotion(0), 0)
                .set(cardRefs.current[1], getMotion(1), 0)
                .to(cardRefs.current[2], getMotion(2), 0)
                .to(cardRefs.current[3], getMotion(3), 0)
                .to(cardRefs.current[4], getMotion(4), 0)


            setMotion(1)
        }
        if (motion == 1) {
            gsap.timeline()
                .to(cardRefs.current[4], getMotion(0), 0)
                .set(cardRefs.current[0], getMotion(1), 0)
                .to(cardRefs.current[1], getMotion(2), 0)
                .to(cardRefs.current[2], getMotion(3), 0)
                .to(cardRefs.current[3], getMotion(4), 0)


            setMotion(2)
        }
        if (motion == 2) {
            gsap.timeline()
                .to(cardRefs.current[3], getMotion(0), 0)
                .set(cardRefs.current[4], getMotion(1), 0)
                .to(cardRefs.current[0], getMotion(2), 0)
                .to(cardRefs.current[1], getMotion(3), 0)
                .to(cardRefs.current[2], getMotion(4), 0)


            setMotion(3)
        }
        if (motion == 3) {
            gsap.timeline()
                .to(cardRefs.current[2], getMotion(0), 0)
                .set(cardRefs.current[3], getMotion(1), 0)
                .to(cardRefs.current[4], getMotion(2), 0)
                .to(cardRefs.current[0], getMotion(3), 0)
                .to(cardRefs.current[1], getMotion(4), 0)


            setMotion(4)
        }
        if (motion == 4) {
            gsap.timeline()
                .to(cardRefs.current[1], getMotion(0), 0)
                .set(cardRefs.current[2], getMotion(1), 0)
                .to(cardRefs.current[3], getMotion(2), 0)
                .to(cardRefs.current[4], getMotion(3), 0)
                .to(cardRefs.current[0], getMotion(4), 0)


            setMotion(0)
        }




    }



    return (
        <div className={classnames(styles.CardCarousel, className)}>
            <button ref={buttonRef} onClick={() => {
                animateButtonRight();


            }}>Move</button>
            {/* <button onClick={() => console.log(JSON.stringify(editorStateRef.current))}>Get State</button> */}
            {cardIdx.map((cardI) => {
                return (

                    <div ref={ref => cardRefs.current[cardI] = ref} className={styles.card}>
                        <h1 className={styles.cardTitle}>Card {cardI}</h1>

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