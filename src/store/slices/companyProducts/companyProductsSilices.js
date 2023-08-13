import { deleteCompanyPaymentFrequency, deleteCompanyProduct, deleteCompanySecurity, postCompanyProduct, postCompanySecurity, postCompanyVPO } from '@/services/products.services'
import { getSecurityItems } from '@/services/security'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const postCurrentCompanyProduct = createAsyncThunk(
  'companyProducts/postCurrentCompanyProduct',
  async (data) => {
    return postCompanyProduct(data).then(({data})=> data)
  }
)

export const postCurrentCompanySecurity = createAsyncThunk(
  'companyProducts/postCurrentCompanySecurity',
  async (data) => {
    return postCompanySecurity(data).then(({data})=> data)
  }
)

export const deleteCurrentCompanySecurity = createAsyncThunk(
  'companyProducts/deleteCurrentCompanySecurity',
  async ({loanTypeId, userCompanyId}) => {
    return deleteCompanySecurity(loanTypeId, userCompanyId).then(({data})=> data)
  }
)

export const deleteCurrentCompanyPaymentFrequency = createAsyncThunk(
  'companyProducts/deleteCurrentCompanyPaymentFrequency',
  async ({loansubtypeid, userCompanyId}) => {
    return deleteCompanyPaymentFrequency(loansubtypeid, userCompanyId).then(({data})=> data)
  }
)

export const postCurrentCompanyVPO = createAsyncThunk(
  'companyProducts/postCurrentCompanyVPO',
  async (data) => {
    return postCompanyVPO(data).then(({data})=> data)
  }
)

export const deleteCurrentCompanyProduct = createAsyncThunk(
  'companyProducts/deleteCurrentCompanyProduct',
  async (id) => {
    return deleteCompanyProduct(id).then(({data})=> data)
  }
)

export const getCurrentChooseSecurityItems = createAsyncThunk(
  'companyProducts/getCurrentChooseSecurityItems',
  async (id) => {
    return getSecurityItems().then(({data})=> data)
  }
)

export const companyProductsSlice = createSlice({
  name:'companyProducts',
  initialState: {
    companyProducts: null,
    companySecurity: null,
    securityItems: null,
    companyProductsLoading: false,
  },
  reducers: {
    setCompanyProducts:(state, action) => {
        state.companyProducts = action.payload;
    }
  },
  extraReducers:{
    [postCurrentCompanyProduct.pending]: (state, action) => {
        state.companyProductsLoading = true
    },
    [postCurrentCompanyProduct.fulfilled]: (state, action) => {
        state.companyProductsLoading = false
        state.companyProducts = action.payload
    },
    [postCurrentCompanyProduct.rejected]: (state, action) => {
        state.companyProductsLoading = false
    },
    [postCurrentCompanySecurity.pending]: (state, action) => {
        state.companyProductsLoading = true
    },
    [postCurrentCompanySecurity.fulfilled]: (state, action) => {
        state.companyProductsLoading = false
        state.companySecurity = action.payload
    },
    [postCurrentCompanySecurity.rejected]: (state, action) => {
        state.companyProductsLoading = false
    },
    [deleteCurrentCompanySecurity.pending]: (state, action) => {
        state.companyProductsLoading = true
    },
    [deleteCurrentCompanySecurity.fulfilled]: (state, action) => {
        state.companyProductsLoading = false
    },
    [deleteCurrentCompanySecurity.rejected]: (state, action) => {
        state.companyProductsLoading = false
    },
    [postCurrentCompanyVPO.pending]: (state, action) => {
        state.companyProductsLoading = true
    },
    [postCurrentCompanyVPO.fulfilled]: (state, action) => {
        state.companyProductsLoading = false
    },
    [postCurrentCompanyVPO.rejected]: (state, action) => {
        state.companyProductsLoading = false
    },
    [deleteCurrentCompanyProduct.pending]: (state, action) => {
        state.companyProductsLoading = true
    },
    [deleteCurrentCompanyProduct.fulfilled]: (state, action) => {
        state.companyProductsLoading = false
    },
    [deleteCurrentCompanyProduct.rejected]: (state, action) => {
        state.companyProductsLoading = false
    },
    [getCurrentChooseSecurityItems.pending]: (state, action) => {
        state.companyProductsLoading = true
    },
    [getCurrentChooseSecurityItems.fulfilled]: (state, action) => {
        state.companyProductsLoading = false
        state.securityItems = action.payload
    },
    [getCurrentChooseSecurityItems.rejected]: (state, action) => {
        state.companyProductsLoading = false
    }
  }
})

export const { setCompanyProducts } = companyProductsSlice.actions;

export default companyProductsSlice.reducer;