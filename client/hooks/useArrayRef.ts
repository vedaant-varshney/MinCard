import { EditorState } from 'lexical';
import {useRef} from 'react';

export function useArrayDivRef() {
    const refs = useRef<HTMLDivElement[] | null[]>([]);
    refs.current = [];
    return [refs];
    // return [refs, (ref: any | never) => ref && refs.current.push(ref)]
}

export function useArrayEditorRef() {
    const refs = useRef<EditorState[]>([]);
    refs.current = [];
    return [refs];

}