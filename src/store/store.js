import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlices';
import industryReducer from './slices/industry/industrySlices';
import subindustryReducer from './slices/subindustry/subindustrySlices';
import companySectorReducer from './slices/companySector/companySectorSlices';
import banksReducer from './slices/banks/bankSlices';
import documentsReducer from './slices/documents/documentSlices'
import kycDocumentsReducer from './slices/kycDocs/kycDocumetsSlices'
import loanTypesReducer from './slices/loanTypes/loanTypesSlices'
import loanSubtypesReducer from './slices/loanSubtypes/loanSubtypesSlices'
import termLoanSubtypesReducer from './slices/termLoanSubtypes/termLoanSubtypesSlices'
import supplyChainSubtypesReducer from './slices/supplyChain/supplyChainSlices'
import companyProductsReducer from './slices/companyProducts/companyProductsSilices'
import cimReducer from './slices/cim/cimSlices'
import termsSheetReducer from './slices/termsSheet/termsSheetSlices'
import notificationsSlices from './slices/notifications/notificationsSlices';

export default configureStore({
  reducer:{
    user: userReducer,
    industry: industryReducer,
    subindustry: subindustryReducer,
    companySector: companySectorReducer,
    banks: banksReducer,
    documents: documentsReducer,
    kycDocuments: kycDocumentsReducer,
    loanTypes: loanTypesReducer,
    loansubtypes: loanSubtypesReducer,
    termLoansubtypes: termLoanSubtypesReducer,
    supplyChainsubtypes: supplyChainSubtypesReducer,
    companyProducts: companyProductsReducer,
    cim: cimReducer,
    termSheet: termsSheetReducer,
    notification: notificationsSlices
  },
});