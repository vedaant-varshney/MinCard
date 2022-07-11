import { forwardRef, memo, useContext, useEffect } from "react";
import classnames from 'classnames';

import styles from './MainEditor.module.scss'
import MakeReadOnly from "@components/plugins/MakeReadOnly";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import EditIcon from '@assets/images/pen-to-square-solid.svg';
import SaveIcon from '@assets/images/floppy-disk-solid.svg';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { DeckCtx } from "redux/deckContext";
import { setReadOnly } from "redux/store";

export type Props = {
    className?: string;
    centerIdx: number;
    cards?: any;
    editorRef: any;
}

const theme = {}
function onError(error: any) {
    console.error(error);
}

const MainEditor = forwardRef(({ className, centerIdx, editorRef }: Props, ref: any) => {

    let [deck, setDeck]  = useContext(DeckCtx)
    const dispatch = useAppDispatch()
    const readOnly = useAppSelector((state) => state.readOnly);
    let deckCopy = deck;

    function EditorManagement() {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
            let editorState = deckCopy.cards[centerIdx].editorState

            editor.setEditorState(editor.parseEditorState(editorState));

            console.log(centerIdx)

        }, [centerIdx, deck])

        return null;
    }

    if (deck !== null) {
        return (
            <div className={classnames(styles.MainEditor, className)}>
                <div ref={ref} className={styles.card}>
                    <h1 className={styles.cardTitle}>{deckCopy.cards[centerIdx].title}</h1>
                    <LexicalComposer initialConfig={{ namespace: "editor", theme: theme, onError: onError }}>
                        <div className={styles.editor}>
                            <EditorManagement />
                            <RichTextPlugin
                                placeholder={<div className={styles.placeholder}>Click on the card and start typing!</div>}
                                contentEditable={<ContentEditable className={styles.editorInput} />}
                            />
                            <OnChangePlugin onChange={editorState => {
                                editorRef.current = editorState;

                                // Updates the editor state from what the Editor is reading from
                                deckCopy.cards[centerIdx].editorState = JSON.stringify(editorState);

                                // TODO: Change this to update deck only when the editor is not active
                                setDeck(deckCopy)
                            }} />
                            <HistoryPlugin />
                            <MakeReadOnly isReadOnly={readOnly} />
                        </div>
                    </LexicalComposer>
                    <div className={styles.sideButtons}>
                        <div onClick={() => dispatch(setReadOnly(!readOnly))} className={styles.blackButton}>
                            <EditIcon className={styles.buttonIcons} />
                        </div>
                        <div onClick={() => { }} className={styles.blackButton}>
                            <SaveIcon className={styles.buttonIcons} />
                        </div>
                    </div>
                </div>


            </div>
        );

    }
    else {
        return <div>Loading...</div>;
    }


})

export default memo(MainEditor);