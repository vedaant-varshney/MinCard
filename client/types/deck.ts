import { EditorState } from "lexical";

interface deckType {
    deckId: number,
    user: string,
    userId: string,
    cards: {
        title: string,
        description: string,
        cardId: string,
        editorState: any
    }[]
}

export type Deck = deckType | null;