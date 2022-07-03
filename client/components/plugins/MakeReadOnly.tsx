import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

interface ReadOnlyProps {
    isReadOnly: boolean
}



export default function MakeReadOnly({ isReadOnly }: ReadOnlyProps) {

    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.setReadOnly(isReadOnly)
    },
        [isReadOnly])
    return null;
}