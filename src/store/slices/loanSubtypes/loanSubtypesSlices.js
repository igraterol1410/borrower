import { getLoansubtypes, getLoansubtypeSecurity } from '@/services/products.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentLoanSubtypes = createAsyncThunk(
  'loanSubtypes/getCurrentLoanSubtypes',
  async ({loanTypeId}) => {
    return getLoansubtypes(loanTypeId).then(({data})=> data)
  }
)

export const getCurrentLoanSubtypeSecurity = createAsyncThunk(
  'loanSubtypes/getCurrentLoanSubtypeSecurity',
  async ({loanTypeId, userCompanyId}) => {
    return getLoansubtypeSecurity(loanTypeId, userCompanyId).then(({data})=> data)
  }
)

export const loanSubtypesSlice = createSlice({
  name:'loanSubtypes',
  initialState: {
    loanSubtypes: null,
    fundedLoanSubtypes: null,
    nonFundedLoanSubtypes: null,
    selectedLoanSubtypes: [],
    loanSubtypesLoading: true,
    loanSubtypeSecurity: null
  },
  reducers: {
    setLoanSubtypes:(state, action) => {
        state.loanSubtypes = action.payload;
    },
    setSelectedLoanSubtypes:(state, action) => {
        state.selectedLoanSubtypes = action.payload;
    }
  },
  extraReducers:{
    [getCurrentLoanSubtypes.pending]: (state, action) => {
        state.loanSubtypesLoading = true
    },
    [getCurrentLoanSubtypes.fulfilled]: (state, action) => {
        state.loanSubtypesLoading = false
        state.loanSubtypes = action.payload
        const funded = action.payload.filter((eachLoanSubtype)=>(eachLoanSubtype?.isFunded === true))
        const nonFunded = action.payload.filter((eachLoanSubtype)=>(eachLoanSubtype?.isFunded === false))
        state.fundedLoanSubtypes = funded
        state.nonFundedLoanSubtypes = nonFunded
    },
    [getCurrentLoanSubtypes.rejected]: (state, action) => {
        state.loanSubtypgetCurrentLoanSubtypeSecurity
    },
    [getCurrentLoanSubtypeSecurity.pending]: (state, action) => {
        state.loanSubtypesLoading = true
    },
    [getCurrentLoanSubtypeSecurity.fulfilled]: (state, action) => {
        state.loanSubtypesLoading = false
        state.loanSubtypeSecurity = action.payload
    },
    [getCurrentLoanSubtypeSecurity.rejected]: (state, action) => {
        state.loanSubtypesLoading = false
    }
  }
})

export const { setLoanSubtypes, setSelectedLoanSubtypes } = loanSubtypesSlice.actions;

export default loanSubtypesSlice.reducer;