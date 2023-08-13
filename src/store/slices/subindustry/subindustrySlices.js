import { getSubIndustriesById } from '@/services/industries.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentSubindustries = createAsyncThunk(
  'subindustry/getCurrentSubindustries',
  async ({industryId}) => {
    return getSubIndustriesById(industryId).then((res)=> res.data)
  }
)

export const subindustrySlice = createSlice({
  name:'subindustry',
  initialState: {
    subindustry: null,
    subisLoading: true,
    selectedSubindustry:null,
    savedSubindustry:null
  },
  reducers: {
    getAllSubindustry:(state, action) => {
        state.allSubindustry = action.payload;
    },
    selectSubindustry:(state, action) => {
        state.selectedSubindustry = action.payload;
    },
    saveSubindustry:(state, action) => {
        state.savedSubindustry = action.payload;
    }
  },
  extraReducers:{
    [getCurrentSubindustries.pending]: (state, action) => {
        state.subisLoading = true
    },
    [getCurrentSubindustries.fulfilled]: (state, action) => {
        state.subisLoading = false
        state.subindustry = action.payload
    },
    [getCurrentSubindustries.rejected]: (state, action) => {
        state.subisLoading = false
    }
  }
})

export const { getAllSubindustry, selectSubindustry, saveSubindustry } = subindustrySlice.actions;

export const getAllSubindustries = (state) => state.subindustry.subindustry;

export default subindustrySlice.reducer;