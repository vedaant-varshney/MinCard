import { forwardRef, memo, useEffect } from "react";
import classnames from 'classnames';

import styles from './MainEditor.module.scss'
import MakeReadOnly from "@components/plugins/MakeReadOnly";
import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import EditIcon from '@assets/images/pen-to-square-solid.svg';
import SaveIcon from '@assets/images/floppy-disk-solid.svg';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


export type Props = {
    className?: string;
    centerIdx: number;
    readOnly: boolean;
    setReadOnly: any;
    cards: any;
    editorRef: any;
}

const theme = {}
function onError(error: any) {
    console.error(error);
}

const MainEditor = forwardRef(({ className, centerIdx, readOnly, setReadOnly, cards, editorRef }: Props, ref: any) => {
    
    
    function EditorManagement() {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
            let editorState = cards[centerIdx].editorState
            editor.setEditorState(editor.parseEditorState(editorState));
            console.log(JSON.stringify(editor.getEditorState()))

            console.log(centerIdx)

        }, [centerIdx])

        return null;
    }

    return (
        <div  className={classnames(styles.MainEditor, className)}>
            <div ref={ref} className={styles.card}>
                <h1 className={styles.cardTitle}>{cards[centerIdx].title}</h1>
                <LexicalComposer initialConfig={{ theme: theme, onError: onError }}>
                    <div className={styles.editor}>
                        <EditorManagement />
                        <RichTextPlugin
                            placeholder={<div className={styles.placeholder}>Click on the card and start typing!</div>}
                            contentEditable={<LexicalContentEditable className={styles.editorInput} />}
                        />
                        <LexicalOnChangePlugin onChange={editorState => { editorRef.current = editorState; cards[centerIdx].editorState = JSON.stringify(editorState); }} />
                        <HistoryPlugin />
                        <MakeReadOnly isReadOnly={readOnly} />
                    </div>
                </LexicalComposer>
                <div className={styles.sideButtons}>
                    <div onClick={() => setReadOnly(!readOnly)} className={styles.blackButton}>
                        <EditIcon className={styles.buttonIcons} />
                    </div>
                    <div onClick={() => { }} className={styles.blackButton}>
                        <SaveIcon className={styles.buttonIcons} />
                    </div>
                </div>
            </div>


        </div>
    );

})

export default memo(MainEditor);