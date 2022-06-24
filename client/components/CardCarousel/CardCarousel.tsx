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
// import MakeReadOnly from "./MakeReadOnly";


export type Props = {
    className?: string;
}

function CardCarousel({ className }: Props) {

    const [cardRefs] = useArrayDivRef()
    const [editorRefs] = useArrayEditorRef();
    let width = useWindowSize();
    const buttonRef = useRef<HTMLButtonElement>(null);
    // const [order, setOrder] = useState([4, 2, 1, 3, 5])
    const [order, setOrder] = useState([2, 1, 3, 5, 4])

    const distanceFromEdgeBottomM = "-40%";
    const distanceFromEdgeLR = "5%";
    const distanceFromEdgeBottomLR = "-50%";
    const offscreenDistanceFromEdgeBottom = "-70%";
    const offscreenDistanceFromEdgeLR = "-20%";



    // [4, 2, 1, 3, 5]
    // Initial card positions
    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.set(cardRefs.current[order[2]], { left: width / 2 - width * 0.22 / 2, bottom: distanceFromEdgeBottomM, rotation: 0 });
            gsap.set(cardRefs.current[order[1]], { left: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: -9, transformOrigin: "left 50%" });
            gsap.set(cardRefs.current[order[3]], { right: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: 9, transformOrigin: "right 50%" });
            gsap.set(cardRefs.current[order[0]], { left: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: -18, transformOrigin: "left 50%" });
            gsap.set(cardRefs.current[order[4]], { right: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: 18, transformOrigin: "right 50%" });
        }
        // animateButtonRight();
    }, [width])



    const animateButtonRight = () => {
        console.log('run animation')
        gsap.timeline({
            onComplete: () => {
                let newOrder: number[] = order;
                newOrder.unshift(newOrder.pop()!);
                setOrder(newOrder)
                console.log(cardRefs.current)
            }
        })

            .set(buttonRef.current, { disabled: true })
            .to(cardRefs.current[order[3]], { left: "", right: offscreenDistanceFromEdgeLR, bottom: offscreenDistanceFromEdgeBottom, rotation: 18, duration: 1.0, ease: Power3.easeInOut, transformOrigin: "right 50%" })
            .set(cardRefs.current[order[3]], { left: offscreenDistanceFromEdgeLR, right: "", bottom: offscreenDistanceFromEdgeBottom, rotation: -18, transformOrigin: "left 50%" })
            .to(cardRefs.current[order[2]], { left: "", right: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: 9, duration: 1.0, ease: Power3.easeInOut, transformOrigin: "right 50%", delay: 0.1 }, 0)
            .to(cardRefs.current[order[1]], { right: "", left: width / 2 - width * 0.22 / 2, bottom: distanceFromEdgeBottomM, rotation: 0, duration: 1.0, ease: Power3.easeInOut, delay: 0.2 }, 0)
            .to(cardRefs.current[order[0]], { right: "", left: distanceFromEdgeLR, bottom: distanceFromEdgeBottomLR, rotation: -9, duration: 1.0, ease: Power3.easeInOut, delay: 0.3, transformOrigin: "left 50%" }, 0)
            .set(buttonRef.current, { disabled: false })
    }


    const theme = {}
    function onError(error: any) {
        console.error(error);
    }


    const initialConfig = {
        theme,
        onError
    }

    const editorStateRef = useRef<EditorState>();



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
    const cardIdx = [1, 2, 3, 4, 5]




    return (
        <div className={classnames(styles.CardCarousel, className)}>
            <button ref={buttonRef} onClick={animateButtonRight}>Move</button>
            <button onClick={() => console.log(JSON.stringify(editorRefs.current[order[2]]))}>Get State</button>
            {cardIdx.map((cardI) => {
                return (

                    <div ref={el => cardRefs.current[cardI] = el} className={styles.card}>
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