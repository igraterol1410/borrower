import { deleteDocuments, downloadDocuments, getKYCDocuments, getKYCUploadedDocuments, uploadDocuments } from '@/services/documents.services';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentKYCDocs = createAsyncThunk(
  'KYCdocuments/getCurrentKYCDocs',
  async ({industryId, subindustryId, documentTypeID}) => {
    return getKYCDocuments(industryId, subindustryId, documentTypeID).then(({data})=> data)
  }
)

export const getCurrentPromotorKYCDocs = createAsyncThunk(
  'KYCdocuments/getCurrentPromotorKYCDocs',
  async ({industryId, subindustryId}) => {
    return getKYCDocuments(industryId, subindustryId, 'A9C0EDD7-AEFB-40E3-8DB8-342E83CCA72E').then(({data})=> data)
  }
)
export const getCurrentFinancialDocs = createAsyncThunk(
  'KYCdocuments/getCurrentFinancialDocs',
  async ({industryId, subindustryId}) => {
    return getKYCDocuments(industryId, subindustryId, 'FA5F4141-F67D-4465-9214-8EFAC56D9111').then(({data})=> data)
  }
)

export const getUploadedKYCDocs = createAsyncThunk(
  'KYCdocuments/getUploadedKYCDocs',
  async ({userCompanyID}) => {
    return getKYCUploadedDocuments(userCompanyID, 'C959AC5D-96A5-4777-984A-724ADE0A8F8A').then(({data})=> data)
  }
)

export const getUploadedPromotorDocs = createAsyncThunk(
  'KYCdocuments/getUploadedPromotorDocs',
  async ({userCompanyID}) => {
    return getKYCUploadedDocuments(userCompanyID, 'A9C0EDD7-AEFB-40E3-8DB8-342E83CCA72E').then(({data})=> data)
  }
)

export const getUploadedFinancialDocs = createAsyncThunk(
  'KYCdocuments/getUploadedFinancialDocs',
  async ({userCompanyID}) => {
    return getKYCUploadedDocuments(userCompanyID, 'FA5F4141-F67D-4465-9214-8EFAC56D9111').then(({data})=> data)
  }
)

export const uploadKYCDocs = createAsyncThunk(
  'KYCdocuments/uploadKYCDocs',
  async (data) => {
    return uploadDocuments(data).then(({data})=> data)
  }
)

export const uploadPromotorKYCDocs = createAsyncThunk(
  'KYCdocuments/uploadPromotorKYCDocs',
  async (data) => {
    return uploadDocuments(data).then(({data})=> data)
  }
)

export const uploadFinancialDocs = createAsyncThunk(
  'KYCdocuments/uploadFinancialDocs',
  async (data) => {
    return uploadDocuments(data).then(({data})=> data)
  }
)

export const downloadDocs = createAsyncThunk(
  'KYCdocuments/downloadDocs',
  async (documentId) => {
    return downloadDocuments(documentId).then(({data})=> data)
  }
)

export const deleteDocs = createAsyncThunk(
  'KYCdocuments/deleteDocs',
  async (documentId) => {
    return deleteDocuments(documentId).then(({data})=> data)
  }
)

export const KYCDocumentsSlice = createSlice({
  name:'KYCdocuments',
  initialState: {
    KYCdocuments: null,
    promotorKYCdocuments: null,
    financialdocuments: null,
    kycDocLoading: true,
    promotorDocLoading: true,
    uploadedDocuments:[],
    uploadedPromotorDocuments:[],
    uploadedFinancialDocuments:[],
    downloadedDocuments:[],
  },
  reducers: {
    setDocuments:(state, action) => {
        state.KYCdocuments = action.payload;
    },
    excludeDocuments:(state, action) => {
        state.excludedDocuments = action.payload;
    }
  },
  extraReducers:{
    [getCurrentKYCDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [getCurrentKYCDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
        state.KYCdocuments = action.payload
    },
    [getCurrentKYCDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    },
    [getCurrentPromotorKYCDocs.pending]: (state, action) => {
        state.promotorDocLoading = true
    },
    [getCurrentPromotorKYCDocs.fulfilled]: (state, action) => {
        state.promotorDocLoading = false
        state.promotorKYCdocuments = action.payload
    },
    [getCurrentPromotorKYCDocs.rejected]: (state, action) => {
        state.promotorDocLoading = false
    },
    [getCurrentFinancialDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [getCurrentFinancialDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
        state.financialdocuments = action.payload
    },
    [getCurrentFinancialDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    },
    [getUploadedKYCDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [getUploadedKYCDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
        state.uploadedDocuments = action.payload
    },
    [getUploadedKYCDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    },
    [getUploadedPromotorDocs.pending]: (state, action) => {
        state.promotorDocLoading = true
    },
    [getUploadedPromotorDocs.fulfilled]: (state, action) => {
        state.promotorDocLoading = false
        state.uploadedPromotorDocuments = action.payload
    },
    [getUploadedPromotorDocs.rejected]: (state, action) => {
        state.promotorDocLoading = false
    },
    [getUploadedFinancialDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [getUploadedFinancialDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
        state.uploadedFinancialDocuments = action.payload
    },
    [getUploadedFinancialDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    },
    [uploadKYCDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [uploadKYCDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
    },
    [uploadKYCDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    },
    [uploadPromotorKYCDocs.pending]: (state, action) => {
        state.promotorDocLoading = true
    },
    [uploadPromotorKYCDocs.fulfilled]: (state, action) => {
        state.promotorDocLoading = false
    },
    [uploadPromotorKYCDocs.rejected]: (state, action) => {
        state.promotorDocLoading = false
    },
    [uploadFinancialDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [uploadFinancialDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
    },
    [uploadFinancialDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    },
    [downloadDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [downloadDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
        state.downloadedDocuments = action.payload
    },
    [downloadDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    },
    [deleteDocs.pending]: (state, action) => {
        state.kycDocLoading = true
    },
    [deleteDocs.fulfilled]: (state, action) => {
        state.kycDocLoading = false
    },
    [deleteDocs.rejected]: (state, action) => {
        state.kycDocLoading = false
    }
  }
})

export const { setDocuments, excludeDocuments } = KYCDocumentsSlice.actions;

export default KYCDocumentsSlice.reducer;