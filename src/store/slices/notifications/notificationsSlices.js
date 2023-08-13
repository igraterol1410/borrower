import { getNotifications } from '@/services/notifications'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentNotifications = createAsyncThunk(
  'notifications/getCurrentNotifications',
  async ({userId}) => {
    return getNotifications(userId).then((res)=> res.data)
  }
)

// export const saveCurrentTerm = createAsyncThunk(
//   'notifications/saveCurrentTerm',
//   async (data) => {
//     return saveTerms(data).then(({data})=> data)
//   }
// )

export const notificationsSlice = createSlice({
  name:'notifications',
  initialState: {
    notificationsInfo: null,
    notificationsLoading: true,
  },
  reducers: {},
  extraReducers:{
    [getCurrentNotifications.pending]: (state, action) => {
        state.notificationsLoading = true
    },
    [getCurrentNotifications.fulfilled]: (state, action) => {
        state.notificationsLoading = false
        state.notificationsInfo = action.payload
    },
    [getCurrentNotifications.rejected]: (state, action) => {
        state.notificationsLoading = false
    }
    // [saveCurrentTerm.pending]: (state, action) => {
    //     state.notificationsLoading = true
    // },
    // [saveCurrentTerm.fulfilled]: (state, action) => {
    //     state.notificationsLoading = false
    //     state.savedSector = action.payload
    // },
    // [saveCurrentTerm.rejected]: (state, action) => {
    //     state.notificationsLoading = false
    // }
  }
})

export const { getSectors, selectSector, saveSector } = notificationsSlice.actions;

export default notificationsSlice.reducer;