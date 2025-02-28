import { configureStore } from '@reduxjs/toolkit'
import pasteSlice from './redux/pasteSlice'

export default configureStore({
    reducer: {
        paste: pasteSlice
      }
})