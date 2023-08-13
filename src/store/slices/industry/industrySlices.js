import { getIndustries, getIndustriesByName, saveIndustry } from '@/services/industries.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentIndustries = createAsyncThunk(
  'industry/getCurrentIndustries',
  async () => {
    return getIndustries().then((res)=> res.data)
  }
)
export const getCurrentIndustriesByName = createAsyncThunk(
  'industry/getCurrentIndustriesByName',
  async (name) => {
    return await getIndustriesByName(name).then((res)=> res)
  }
)

export const saveCurrentIndustries = createAsyncThunk(
  'industry/saveCurrentIndustries',
  async (data) => {
    return await saveIndustry(data).then(({data})=> data)
  }
)

export const industrySlice = createSlice({
  name:'industry',
  initialState: {
    industry: null,
    allIndustry:null,
    isLoading: true,
    selectedIndustry:null,
    selectedIndustryIndex:null,
    savedData:null
  },
  reducers: {
    getAllIndustry:(state, action) => {
        state.allIndustry = action.payload;
    },
    filterIndustry:(state, action) => {
        state.industry = action.payload;
    },
    selectIndustry:(state, action) => {
        state.selectedIndustry = action.payload;
    },
    selectIndustryIndex:(state, action) => {
        state.selectedIndustryIndex = action.payload;
    },
    cancelIndustry:(state) => {
        state.selectedIndustry = null;
        state.selectedIndustryIndex = null;
    }
  },
  extraReducers:{
    [getCurrentIndustries.pending]: (state, action) => {
        state.isLoading = true
    },
    [getCurrentIndustries.fulfilled]: (state, action) => {
        state.isLoading = false
        state.industry = action.payload
    },
    [getCurrentIndustries.rejected]: (state, action) => {
        state.isLoading = false
    },
    [getCurrentIndustriesByName.pending]: (state, action) => {
        state.isLoading = true
    },
    [getCurrentIndustriesByName.fulfilled]: (state, action) => {
        state.isLoading = false
        state.industry = action.payload
    },
    [getCurrentIndustriesByName.rejected]: (state, action) => {
        state.isLoading = false
    },
    [saveCurrentIndustries.pending]: (state, action) => {
        state.isLoading = true
    },
    [saveCurrentIndustries.fulfilled]: (state, action) => {
        state.isLoading = false
        state.savedData = action.payload
    },
    [saveCurrentIndustries.rejected]: (state, action) => {
        state.isLoading = false
    }
  }
})

export const { getAllIndustry, filterIndustry, selectIndustry, selectIndustryIndex, cancelIndustry } = industrySlice.actions;

export const getAllIndustries = (state) => state.industry.industry;

export default industrySlice.reducer;