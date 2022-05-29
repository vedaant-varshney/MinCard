import { memo, useEffect, useRef } from "react";
import classnames from 'classnames';
import { $getRoot, $getSelection, EditorState } from 'lexical';

import LexicalComposer from '@lexical/react/LexicalComposer';
// import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';



import styles from './SampleCard.module.scss';

const theme = {
    // Theme styling goes here

}


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

    const initialConfig = {
        theme,
        onError
    }

    const editorStateRef = useRef<EditorState>();
    

    return (
        <div className={classnames(styles.SampleCard, className)}>
            <h1>Sample Min Card</h1>
            <h2>Bingo Bongo</h2>
            <LexicalComposer initialConfig={initialConfig}>
                <div className={styles.editor}>
                    <RichTextPlugin
                        placeholder={<Placeholder/>}
                        contentEditable={<LexicalContentEditable className={styles.editorInput} />}
                    />
                    <LexicalOnChangePlugin onChange={editorState => editorStateRef.current = editorState} />
                    <HistoryPlugin />
                    <MyCustomAutoFocusPlugin />

                </div>
            </LexicalComposer>
            <button onClick={() => console.log(JSON.stringify(editorStateRef.current))}>Submit</button>
        </div>
    );
}

export default memo(SampleCard);