import { getLoansubtypes, getLoansubtypeSecurity } from '@/services/products.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentTermLoanSubtypes = createAsyncThunk(
  'termLoanSubtypes/getCurrentTermLoanSubtypes',
  async ({loanTypeId}) => {
    return getLoansubtypes(loanTypeId).then(({data})=> data)
  }
)

export const getCurrentTermLoanSubtypeSecurity = createAsyncThunk(
  'termLoanSubtypes/getCurrentTermLoanSubtypeSecurity',
  async ({loanTypeId, userCompanyId}) => {
    return getLoansubtypeSecurity(loanTypeId, userCompanyId).then(({data})=> data)
  }
)

export const termLoanSubtypesSlice = createSlice({
  name:'termLoanSubtypes',
  initialState: {
    termLoanSubtypes: null,
    fundedTermLoanSubtypes: null,
    nonFundedTermLoanSubtypes: null,
    selectedTermLoanSubtypes: [],
    termLoanSubtypesLoading: true,
    termLoanSubtypeSecurity: null
  },
  reducers: {
    setTermLoanSubtypes:(state, action) => {
        state.termLoanSubtypes = action.payload;
    },
    setSelectedTermLoanSubtypes:(state, action) => {
        state.selectedTermLoanSubtypes = action.payload;
    }
  },
  extraReducers:{
    [getCurrentTermLoanSubtypes.pending]: (state, action) => {
        state.termLoanSubtypesLoading = true
    },
    [getCurrentTermLoanSubtypes.fulfilled]: (state, action) => {
        state.termLoanSubtypesLoading = false
        state.termLoanSubtypes = action.payload
        const funded = action.payload.filter((eachLoanSubtype)=>(eachLoanSubtype?.isFunded === true))
        const nonFunded = action.payload.filter((eachLoanSubtype)=>(eachLoanSubtype?.isFunded === false))
        state.fundedTermLoanSubtypes = funded
        state.nonFundedTermLoanSubtypes = nonFunded
    },
    [getCurrentTermLoanSubtypes.rejected]: (state, action) => {
        state.loanSubtypgetCurrentLoanSubtypeSecurity
    },
    [getCurrentTermLoanSubtypeSecurity.pending]: (state, action) => {
        state.termLoanSubtypesLoading = true
    },
    [getCurrentTermLoanSubtypeSecurity.fulfilled]: (state, action) => {
        state.termLoanSubtypesLoading = false
        state.termLoanSubtypeSecurity = action.payload
    },
    [getCurrentTermLoanSubtypeSecurity.rejected]: (state, action) => {
        state.termLoanSubtypesLoading = false
    }
  }
})

export const { setTermLoanSubtypes, setSelectedTermLoanSubtypes } = termLoanSubtypesSlice.actions;

export default termLoanSubtypesSlice.reducer;