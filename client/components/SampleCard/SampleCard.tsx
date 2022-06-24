import { memo, useEffect, useState, useRef } from "react";
import classnames from 'classnames';
import { $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical';

import LexicalComposer from '@lexical/react/LexicalComposer';
// import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import EditIcon from '@assets/images/pen-to-square-solid.svg';
import SaveIcon from '@assets/images/floppy-disk-solid.svg';
import MakeReadOnly from "@components/plugins/MakeReadOnly";

import styles from './SampleCard.module.scss';

const theme = {
    // Theme styling goes here
}


// interface ReadOnlyProps {
//     isReadOnly: boolean
// }

// function MakeReadOnly({ isReadOnly }: ReadOnlyProps) {

//     const [editor] = useLexicalComposerContext();
//     useEffect(() => {
//         editor.setReadOnly(isReadOnly)
//     },
//         [isReadOnly])
//     return null;
// }
// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}


interface UpdateEditorStateProps {
    editorState: EditorState | undefined
}

function UpdateEditorState({ editorState }: UpdateEditorStateProps) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (editorState !== undefined) {
            console.log(JSON.stringify(editorState))
            editor.parseEditorState(JSON.stringify(editorState))
            editor.setEditorState(editorState)
        }
    }, [editorState])

    return null;
}

function onError(error: any) {
    console.error(error);
}



export type Props = {
    className?: string;
}

function Placeholder() {
    return (<div className={styles.editorPlaceholder}>Enter some text...</div>);
}

function SampleCard({ className }: Props) {

    const [editorSample, setEditorSample] = useState<EditorState | undefined>();

    const initialConfig = {
        theme,
        onError
    }

    const editorStateRef = useRef<EditorState>();
    // const [editor] = useLexicalComposerContext();
    const [readOnly, setReadOnly] = useState(false);

    return (
        <>
            <div className={classnames(styles.SampleCard, className)}>
                <h1 className={styles.cardTitle}>Card Title</h1>
                <LexicalComposer initialConfig={initialConfig}>
                    <div className={styles.editor}>
                        <RichTextPlugin
                            placeholder={<Placeholder />}
                            contentEditable={<LexicalContentEditable className={styles.editorInput} />}
                        />
                        <LexicalOnChangePlugin onChange={editorState => editorStateRef.current = editorState} />
                        <HistoryPlugin />
                        <MyCustomAutoFocusPlugin />
                        <MakeReadOnly isReadOnly={readOnly} />

                    </div>
                </LexicalComposer>
                {/* <button onClick={() => console.log(JSON.stringify(editorStateRef.current))}>Submit</button>
            <button onClick={() => setReadOnly(!readOnly)}>Read-Only</button> */}
                <div className={styles.sideButtons}>
                    <div onClick={() => setReadOnly(!readOnly)} className={styles.blackButton}>
                        <EditIcon className={styles.buttonIcons} />
                    </div>
                    <div onClick={() => {console.log(JSON.stringify(editorStateRef.current)); setEditorSample(editorStateRef.current)}} className={styles.blackButton}>
                        <SaveIcon className={styles.buttonIcons} />
                    </div>
                </div>
            </div>



        </>
    );
}

export default memo(SampleCard);