import { getLoansubtypes, getLoansubtypeSecurity } from '@/services/products.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentSupplyChainSubtypes = createAsyncThunk(
  'supplyChainSubtypes/getCurrentSupplyChainSubtypes',
  async ({loanTypeId}) => {
    return getLoansubtypes(loanTypeId).then(({data})=> data)
  }
)

export const getCurrentSupplyChainSubtypeSecurity = createAsyncThunk(
  'supplyChainSubtypes/getCurrentSupplyChainSubtypeSecurity',
  async ({loanTypeId, userCompanyId}) => {
    return getLoansubtypeSecurity(loanTypeId, userCompanyId).then(({data})=> data)
  }
)

export const supplyChainSubtypesSlice = createSlice({
  name:'supplyChainSubtypes',
  initialState: {
    supplyChainSubtypes: null,
    fundedSupplyChainSubtypes: null,
    nonFundedSupplyChainSubtypes: null,
    selectedSupplyChainSubtypes: [],
    supplyChainSubtypesLoading: true,
    supplyChainSubtypeSecurity: null
  },
  reducers: {
    setSupplyChainSubtypes:(state, action) => {
        state.supplyChainSubtypes = action.payload;
    },
    setSelectedSupplyChainSubtypes:(state, action) => {
        state.selectedSupplyChainSubtypes = action.payload;
    }
  },
  extraReducers:{
    [getCurrentSupplyChainSubtypes.pending]: (state, action) => {
        state.supplyChainSubtypesLoading = true
    },
    [getCurrentSupplyChainSubtypes.fulfilled]: (state, action) => {
        state.supplyChainSubtypesLoading = false
        state.supplyChainSubtypes = action.payload
        const funded = action.payload.filter((eachLoanSubtype)=>(eachLoanSubtype?.isFunded === true))
        const nonFunded = action.payload.filter((eachLoanSubtype)=>(eachLoanSubtype?.isFunded === false))
        state.fundedSupplyChainSubtypes = funded
        state.nonFundedSupplyChainSubtypes = nonFunded
    },
    [getCurrentSupplyChainSubtypes.rejected]: (state, action) => {
        state.loanSubtypgetCurrentLoanSubtypeSecurity
    },
    [getCurrentSupplyChainSubtypeSecurity.pending]: (state, action) => {
        state.supplyChainSubtypesLoading = true
    },
    [getCurrentSupplyChainSubtypeSecurity.fulfilled]: (state, action) => {
        state.supplyChainSubtypesLoading = false
        state.supplyChainSubtypeSecurity = action.payload
    },
    [getCurrentSupplyChainSubtypeSecurity.rejected]: (state, action) => {
        state.supplyChainSubtypesLoading = false
    }
  }
})

export const { setSupplyChainSubtypes, setSelectedSupplyChainSubtypes } = supplyChainSubtypesSlice.actions;

export default supplyChainSubtypesSlice.reducer;