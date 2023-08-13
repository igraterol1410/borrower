import { getLoanTypes } from '@/services/products.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentLoanTypes = createAsyncThunk(
  'loanTypes/getCurrentLoanTypes',
  async () => {
    return getLoanTypes().then(({data})=> data)
  }
)

export const loanTypesSlice = createSlice({
  name:'loanTypes',
  initialState: {
    loanTypes: null,
    loanTypesLoading: true,
  },
  reducers: {
    setLoanTypes:(state, action) => {
        state.loanTypes = action.payload;
    }
  },
  extraReducers:{
    [getCurrentLoanTypes.pending]: (state, action) => {
        state.loanTypesLoading = true
    },
    [getCurrentLoanTypes.fulfilled]: (state, action) => {
        state.loanTypesLoading = false
        state.loanTypes = action.payload
    },
    [getCurrentLoanTypes.rejected]: (state, action) => {
        state.loanTypesLoading = false
    }
  }
})

export const { setLoanTypes } = loanTypesSlice.actions;

export default loanTypesSlice.reducer;