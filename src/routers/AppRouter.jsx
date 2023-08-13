import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Industry from '../pages/industry/Industry';
import AllYouDo from '../pages/all-you-do/AllYouDo';
import Home from '../pages/Home';
import Dashboard from '../pages/dashboard/Dashboard';
import PrivateRoute from './PrivateRoutes';
import CompanyProducts from '@/pages/compayProducts/CompanyProducts';
import Preferences from '@/pages/preferences/Preferences';
import KycDocuments from '@/pages/kycDocuments/KycDocuments';
import FinancialDocuments from '@/pages/financialDocuments/FinancialDocuments';
import Teasor from '@/pages/teasor/Teasor';
import LandingPage from '@/pages/landingPage/LandingPage';
import TermsSheet from '@/pages/termsSheet/TermsSheet';
import Admin from '@/pages/admin/Admin';
import Adduser from '@/pages/AddUser/Adduser';

const AppRouter = () => {
  return (
    <>
      <Router>
          <Routes>
              <Route 
              path="/" 
              element={<Home/>} 
              />
              <Route 
              path="/dashboard" 
              element={<PrivateRoute element={Dashboard} />} 
              >
                <Route 
                path="/dashboard/industry" 
                element={<Industry/>} />
                <Route 
                path="/dashboard/all-you-do" 
                element={<AllYouDo/>} />
                <Route 
                path="/dashboard/company-products" 
                element={<CompanyProducts/>} />
                <Route 
                path="/dashboard/preferences" 
                element={<Preferences/>} />
                <Route 
                path="/dashboard/kyc-documents" 
                element={<KycDocuments/>} />
                <Route 
                path="/dashboard/financial-documents" 
                element={<FinancialDocuments/>} />
                <Route 
                path="/dashboard/terms-sheet" 
                element={<TermsSheet/>} />
              </Route>
              <Route 
              path="/teasor" 
              element={<Teasor/>} 
              />
              <Route 
              path="/landing" 
              element={<LandingPage />} 
              />
              <Route 
              path="/admin" 
              element={<Admin />} 
              />
              <Route 
              path="/add-user" 
              element={<Adduser />} 
              />
          </Routes>
      </Router>
    </>
  )
}

export default AppRouter