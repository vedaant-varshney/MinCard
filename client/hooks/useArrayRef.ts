import {useRef} from 'react';

export function useArrayRef() {
    const refs = useRef<HTMLDivElement[]>([]);
    refs.current = [];
    return [refs, (ref: any | never) => ref && refs.current.push(ref)]
}