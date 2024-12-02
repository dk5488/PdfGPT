import { configureStore } from '@reduxjs/toolkit'

import setReducer from './tokenReducer'

export default configureStore({
  reducer: {
    
    setter:setReducer
  }
})