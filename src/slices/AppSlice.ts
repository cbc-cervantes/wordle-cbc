
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { WordText } from 'components/Word'
import { getRandomWord } from 'static/wordsCatalogue'
export interface AppState {
  version: number,
  showInstructions: boolean,
  showStatistics: boolean,
  darkMode: boolean,
  allowedKeys: Array<string>,
  selectedWords: Array<string>,
  word?: {
    value: string,
    selectedAt: number
  },
  attempts: Array<WordText>,
  currentAttempt: Array<string>,
  canGuessWord: boolean,
  lostGame: boolean,
  wins: number,
  games: number,

}

export const initialAppState: AppState = {
  version: 1,
  showInstructions: false,
  showStatistics: false,
  darkMode: false,
  allowedKeys: [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ",
    "enter", "z", "x", "c", "v", "b", "n", "m", "backspace"
  ],
  selectedWords: [],
  word: undefined,
  attempts: [],
  currentAttempt: [],
  canGuessWord: false,
  lostGame: false,
  wins: 0,
  games: 0,
}

const storeState = (state: AppState) => {
  localStorage.removeItem("state")
  localStorage.setItem("state", JSON.stringify(state))
}

const AppSlice = createSlice({
  name: 'counter',
  initialState: localStorage.state ? (JSON.parse(localStorage.state) as AppState) : initialAppState,
  reducers: {
    toggleDarkMode: (state: AppState,) => {
      state.darkMode = !state.darkMode
      storeState(state)
    },
    turnOnDarkMode: (state: AppState) => {
      state.darkMode = true
      storeState(state)
    },
    turnOffDarkMode: (state: AppState) => {
      state.darkMode = false
      storeState(state)
    },
    showInstructionsModal: (state: AppState) => {
      state.showInstructions = true
    },
    hideInstructionsModal: (state: AppState) => {
      state.showInstructions = false
    },
    showStatisticsModal: (state: AppState) => {
      state.showStatistics = true
    },
    hideStatisticsModal: (state: AppState) => {
      state.showStatistics = false
    },
    addSelectedWord: (state: AppState, action: PayloadAction<string>) => {
      state.selectedWords = [
        ...state.selectedWords,
        action.payload
      ]
      storeState(state)
    },
    setWord: (state: AppState) => {
      let selectedWord = getRandomWord()
      while (state.selectedWords.includes(selectedWord.value)) {
        selectedWord = getRandomWord()
      }
      state.selectedWords = [
        ...state.selectedWords,
        selectedWord.value
      ]
      state.word = selectedWord
      state.attempts = []
      state.currentAttempt = []
      state.canGuessWord = true
      state.lostGame = false
      storeState(state)
    },
    setAttempts: (state: AppState, action: PayloadAction<Array<WordText>>) => {
      state.attempts = action.payload
      storeState(state)
    },
    setCurrentAttempt: (state: AppState, action: PayloadAction<Array<string>>) => {
      state.currentAttempt = action.payload
      storeState(state)
    },
    lostGame: (state: AppState) => {
      state.lostGame = true
      state.games += 1
      state.canGuessWord = false
      storeState(state)
    },
    wonGame: (state: AppState) => {
      state.wins += 1
      state.lostGame = false
      state.games += 1
      state.canGuessWord = false
      storeState(state)
    },
  }
})

export const {
  toggleDarkMode,
  turnOnDarkMode,
  turnOffDarkMode,
  showInstructionsModal,
  hideInstructionsModal,
  showStatisticsModal,
  hideStatisticsModal,
  setWord,
  setCurrentAttempt,
  setAttempts,
  lostGame,
  wonGame,
} = AppSlice.actions

export const appStore = configureStore({
  reducer: AppSlice.reducer
})

export default AppSlice