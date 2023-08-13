import { getBankingArrangments, getCimInfo, getComparison, getCustomerSupplier, getFinancialData, getHealthcheckData, getLoanInfo, getPromotorShareholder, getRating, getSecurityDataByUSer, getSegmentBreakup, getSwotData } from '@/services/cim.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentCimInfo = createAsyncThunk(
  'cim/getCurrentCimInfo',
  async ({userCompanyId}) => {
    return getCimInfo(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentSegmentBreakup = createAsyncThunk(
  'cim/getCurrentSegmentBreakup',
  async ({userCompanyId}) => {
    return getSegmentBreakup(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentLoanInfo = createAsyncThunk(
  'cim/getCurrentLoanInfo',
  async ({userCompanyId}) => {
    return getLoanInfo(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentFinancialData = createAsyncThunk(
  'cim/getCurrentFinancialData',
  async ({userCompanyId}) => {
    return getFinancialData(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentBankingArrangments = createAsyncThunk(
  'cim/getCurrentBankingArrangments',
  async ({userCompanyId}) => {
    return getBankingArrangments(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentCustomerSupplier = createAsyncThunk(
  'cim/getCurrentCustomerSupplier',
  async ({userCompanyId}) => {
    return getCustomerSupplier(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentSwotData = createAsyncThunk(
  'cim/getCurrentSwotData',
  async ({userCompanyId}) => {
    return getSwotData(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentPromotorShareholder = createAsyncThunk(
  'cim/getCurrentPromotorShareholder',
  async ({userCompanyId}) => {
    return getPromotorShareholder(userCompanyId).then(({data})=> data)
  }
)

export const getCurrentComparison = createAsyncThunk(
  'cim/getCurrentComparison',
  async ({userCompanyId}) => {
    return getComparison(userCompanyId).then(({data})=> data)
  }
)
export const getCurrentRating = createAsyncThunk(
  'cim/getCurrentRating',
  async ({userCompanyId}) => {
    return getRating(userCompanyId).then(({data})=> data)
  }
)
export const getCurrentSecurityByUser = createAsyncThunk(
  'cim/getCurrentSecurityByUser',
  async ({userCompanyId}) => {
    return getSecurityDataByUSer(userCompanyId).then(({data})=> data)
  }
)

export const getCurrenthealthCheckData = createAsyncThunk(
  'cim/getCurrenthealthCheckData',
  async ({userCompanyId}) => {
    return getHealthcheckData(userCompanyId).then(({data})=> data)
  }
)

export const cimSlice = createSlice({
  name:'cim',
  initialState: {
    cim: null,
    segmentBreakup: null,
    loanInfo: null,
    financialData:null,
    bankingArrangments:null,
    customerSupplier:null,
    swot:null,
    promotorShareholder:null,
    comparison:null,
    rating:null,
    securityData:null,
    healthCheckData:null,
    cimLoading: true
  },
  reducers: {},
  extraReducers:{
    [getCurrentCimInfo.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentCimInfo.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.cim = action.payload
    },
    [getCurrentCimInfo.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentSegmentBreakup.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentSegmentBreakup.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.segmentBreakup = action.payload
    },
    [getCurrentSegmentBreakup.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentLoanInfo.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentLoanInfo.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.loanInfo = action.payload
    },
    [getCurrentLoanInfo.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentFinancialData.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentFinancialData.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.financialData = action.payload
    },
    [getCurrentFinancialData.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentBankingArrangments.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentBankingArrangments.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.bankingArrangments = action.payload
    },
    [getCurrentBankingArrangments.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentSwotData.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentSwotData.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.swot = action.payload
    },
    [getCurrentSwotData.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentCustomerSupplier.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentCustomerSupplier.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.customerSupplier = action.payload
    },
    [getCurrentCustomerSupplier.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentPromotorShareholder.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentPromotorShareholder.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.promotorShareholder = action.payload
    },
    [getCurrentPromotorShareholder.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentComparison.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentComparison.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.comparison = action.payload
    },
    [getCurrentComparison.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentRating.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentRating.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.rating = action.payload
    },
    [getCurrentRating.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrentSecurityByUser.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrentSecurityByUser.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.securityData = action.payload
    },
    [getCurrentSecurityByUser.rejected]: (state, action) => {
        state.cimLoading = false
    },
    [getCurrenthealthCheckData.pending]: (state, action) => {
        state.cimLoading = true
    },
    [getCurrenthealthCheckData.fulfilled]: (state, action) => {
        state.cimLoading = false
        state.healthCheckData = action.payload
    },
    [getCurrenthealthCheckData.rejected]: (state, action) => {
        state.cimLoading = false
    }
  }
})

export const { } = cimSlice.actions;

export default cimSlice.reducer;