import { getBanks, getFilterBanks, getLenderAction, postBanks } from '@/services/banks.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentBanks = createAsyncThunk(
  'banks/getCurrentBanks',
  async () => {
    return getBanks().then((res)=> res.data)
  }
)
export const getCurrentBanksByName = createAsyncThunk(
  'banks/getCurrentBanksByName',
  async (bankName) => {
    return getFilterBanks(bankName).then((res)=> res)
  }
)
export const postCurrentBanks = createAsyncThunk(
  'banks/postCurrentBanks',
  async (data) => {
    return postBanks(data).then((res)=> res)
  }
  )
  
  export const getCurrentLenderAction = createAsyncThunk(
    'banks/getCurrentLenderAction',
    async ({userCompanyId}) => {
      return getLenderAction(userCompanyId).then(({data})=> data)
    }
  )
  
export const BankSlice = createSlice({
  name:'banks',
  initialState: {
    banks: null,
    banksBackUp: null,
    bankLoading: true,
    excludedBank:[],
    excludedBankList:[],
    includedBank:[],
    includedBankList:[],
    lenders:[],
    savedBank:null
  },
  reducers: {
    setBanks:(state, action) => {
        state.banks = action.payload;
    },
    excludeBank:(state, action) => {
        state.excludedBank = action.payload;
    },
    includeBank:(state, action) => {
        state.includedBank = action.payload;
    },
    excludeBankList:(state, action) => {
        state.excludedBankList = action.payload;
    },
    includeBankList:(state, action) => {
        state.includedBankList = action.payload;
    },
    getPublicBank:(state, action) => {
      const currentPublicBanks = action.payload.filter((eachBank)=>(eachBank.isPublicBank))
      state.banks = currentPublicBanks 
    },
    getPrivateBank:(state, action) => {
      const currentPrivateBanks = action.payload.filter((eachBank)=>(!eachBank.isPublicBank)) 
      state.banks = currentPrivateBanks
    }
  },
  extraReducers:{
    [getCurrentBanks.pending]: (state, action) => {
        state.bankLoading = true
    },
    [getCurrentBanks.fulfilled]: (state, action) => {
        state.bankLoading = false
        state.banks = action.payload
        state.banksBackUp = action.payload
        state.excludedBankList = action.payload
        state.includedBankList = action.payload
      },
    [getCurrentBanks.rejected]: (state, action) => {
        state.bankLoading = false
    },
    [getCurrentBanksByName.pending]: (state, action) => {
        state.bankLoading = true
    },
    [getCurrentBanksByName.fulfilled]: (state, action) => {
        state.bankLoading = false
        state.banks = action.payload
    },
    [getCurrentBanksByName.rejected]: (state, action) => {
        state.bankLoading = false
    },
    [postCurrentBanks.pending]: (state, action) => {
        state.bankLoading = true
    },
    [postCurrentBanks.fulfilled]: (state, action) => {
        state.bankLoading = false
    },
    [postCurrentBanks.rejected]: (state, action) => {
        state.bankLoading = false
    },
    [getCurrentLenderAction.pending]: (state, action) => {
        state.bankLoading = true
    },
    [getCurrentLenderAction.fulfilled]: (state, action) => {
        state.lenders = action.payload
        state.bankLoading = false
    },
    [getCurrentLenderAction.rejected]: (state, action) => {
        state.bankLoading = false
    }
  }
})

export const { setBanks, excludeBank, includeBank, excludeBankList, includeBankList, getPublicBank, getPrivateBank } = BankSlice.actions;

export const getAllBanks = (state) => state.banks.banks;

export default BankSlice.reducer;