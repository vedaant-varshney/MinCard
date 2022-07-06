import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, memo } from "react";

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

export default memo(MakeReadOnly);