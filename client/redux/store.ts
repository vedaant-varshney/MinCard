import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditorState } from 'lexical'
import { Deck } from 'types/deck'

interface stateInterface {
    carouselCenterIdx: number
    deckCenterIdx: number
    carouselCardTitles: string[]
    allCardTitles: string[]
    carouselCardDescriptions: string[]
    allCardDescriptions: string[]

}

const initialState: stateInterface = {
    carouselCenterIdx: 2,
    deckCenterIdx: 2,
    carouselCardTitles: [''],
    allCardTitles: [''],
    carouselCardDescriptions: [''],
    allCardDescriptions: ['']

}


const { actions, reducer } = createSlice({
    name: "main",
    initialState: initialState,
    reducers: {
        setCarouselCardTitles(state: any, action: PayloadAction<string[]>) {
            state.carouselCardTitles = action.payload;
        },
        setAllCardTitles(state: any, action: PayloadAction<string[]>) {
            state.allCardTitles = action.payload;
        }

    }

})

export const { setCarouselCardTitles, setAllCardTitles } = actions


export const store = configureStore({
    reducer: reducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch