import { getCompanySector } from '@/services/industries.services'
import { deleteSectors, setSectors } from '@/services/sectors.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentSector = createAsyncThunk(
  'companySector/getCurrentSector',
  async () => {
    return getCompanySector().then((res)=> res.data)
  }
)

export const saveCurrentSector = createAsyncThunk(
  'companySector/saveCurrentSector',
  async (data) => {
    return setSectors(data).then(({data})=> data)
  }
)

export const deleteCurrentSector = createAsyncThunk(
  'companySector/deleteCurrentSector',
  async ({id}) => {
    return deleteSectors(id).then(({data})=> data)
  }
)

export const companySectorSlice = createSlice({
  name:'companySector',
  initialState: {
    companySector: null,
    sectorLoading: true,
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
    [getCurrentSector.pending]: (state, action) => {
        state.sectorLoading = true
    },
    [getCurrentSector.fulfilled]: (state, action) => {
        state.sectorLoading = false
        state.companySector = action.payload
    },
    [getCurrentSector.rejected]: (state, action) => {
        state.sectorLoading = false
    },
    [saveCurrentSector.pending]: (state, action) => {
        state.sectorLoading = true
    },
    [saveCurrentSector.fulfilled]: (state, action) => {
        state.sectorLoading = false
        state.savedSector = action.payload
    },
    [saveCurrentSector.rejected]: (state, action) => {
        state.sectorLoading = false
    },
    [deleteCurrentSector.pending]: (state, action) => {
        state.sectorLoading = true
    },
    [deleteCurrentSector.fulfilled]: (state, action) => {
        state.sectorLoading = false
    },
    [deleteCurrentSector.rejected]: (state, action) => {
        state.sectorLoading = false
    }
  }
})

export const { getSectors, selectSector, saveSector } = companySectorSlice.actions;

export const getAllSubindustries = (state) => state.companySector.companySector;

export default companySectorSlice.reducer;