import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface stateInterface {
    carouselCenterIdx: number;
    deckCenterIdx: number;
    motionLeft: number;
    motionRight: number;
    carouselCardTitles: string[];
    allCardTitles: string[];
    carouselCardDescriptions: string[];
    allCardDescriptions: string[];
    readOnly: boolean;

}

const initialState: stateInterface = {
    carouselCenterIdx: 2,
    deckCenterIdx: 2,
    motionLeft: 0,
    motionRight: 0,
    carouselCardTitles: [''],
    allCardTitles: [''],
    carouselCardDescriptions: [''],
    allCardDescriptions: [''],
    readOnly: false

}


const { actions, reducer } = createSlice({
    name: "main",
    initialState: initialState,
    reducers: {
        setCarouselCenterIdx(state: any, action: PayloadAction<number>) {
            state.carouselCenterIdx = action.payload
        },
        setDeckCenterIdx(state: any, action: PayloadAction<number>) {
            state.deckCenterIdx = action.payload;
        },
        setMotionLeft(state: any, action: PayloadAction<number>) {
            state.motionLeft = action.payload;
        },
        setMotionRight(state: any, action: PayloadAction<number>) {
            state.motionRight = action.payload;
        },
        setCarouselCardTitles(state: any, action: PayloadAction<string[]>) {
            state.carouselCardTitles = action.payload;
        },
        setAllCardTitles(state: any, action: PayloadAction<string[]>) {
            state.allCardTitles = action.payload;
        },
        setReadOnly(state: any, action: PayloadAction<boolean>) {
            state.readOnly = action.payload;
        },
        setCarouselCardDescriptions(state: any, action: PayloadAction<string[]>) {
            state.carouselCardDescriptions = action.payload;

        },

        setAllCardDescriptions(state: any, action: PayloadAction<string[]>) {
            state.allCardDescriptions = action.payload;

        }

    }

})

export const { setCarouselCardTitles, setAllCardTitles, setDeckCenterIdx, setCarouselCenterIdx, setMotionLeft, setMotionRight, setReadOnly, setAllCardDescriptions, setCarouselCardDescriptions} = actions


export const store = configureStore({
    reducer: reducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch