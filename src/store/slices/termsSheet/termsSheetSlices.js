import { getTerms, saveTerms } from '@/services/termsSheet.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentTerms = createAsyncThunk(
  'termsSheet/getCurrentTerms',
  async ({userCompanyId}) => {
    return getTerms(userCompanyId).then((res)=> res.data)
  }
)

export const saveCurrentTerm = createAsyncThunk(
  'termsSheet/saveCurrentTerm',
  async (data) => {
    return saveTerms(data).then(({data})=> data)
  }
)

export const termsSheetSlice = createSlice({
  name:'termsSheet',
  initialState: {
    termsSheetInfo: null,
    termsSheetLoading: true,
    selectedSector:[],
    savedSector:null
  },
  reducers: {
    getSectors:(state, action) => {
        state.allSubindustry = action.payload;
    },
    selectSector:(state, action) => {
        state.selectedSector = action.payload;
    },
    saveSector:(state, action) => {
        state.savedSector = action.payload;
    }
  },
  extraReducers:{
    [getCurrentTerms.pending]: (state, action) => {
        state.termsSheetLoading = true
    },
    [getCurrentTerms.fulfilled]: (state, action) => {
        state.termsSheetLoading = false
        state.termsSheetInfo = action.payload
    },
    [getCurrentTerms.rejected]: (state, action) => {
        state.termsSheetLoading = false
    },
    [saveCurrentTerm.pending]: (state, action) => {
        state.termsSheetLoading = true
    },
    [saveCurrentTerm.fulfilled]: (state, action) => {
        state.termsSheetLoading = false
        state.savedSector = action.payload
    },
    [saveCurrentTerm.rejected]: (state, action) => {
        state.termsSheetLoading = false
    }
  }
})

export const { getSectors, selectSector, saveSector } = termsSheetSlice.actions;

export default termsSheetSlice.reducer;