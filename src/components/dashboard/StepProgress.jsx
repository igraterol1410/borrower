import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './styles/stepprogress.css'

import CompletedStepIcon from '../../assets/icons/completed-step.svg'
import InProgressStepIcon from '../../assets/icons/step-arrow-active-icon.svg'
import PendingStepIcon from '../../assets/icons/step-arrow-icon.svg'
import { useLocation, useNavigate } from 'react-router-dom';

const StepProgress = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, userCompanyInfo } = useSelector(state => state?.user)
  const { uploadedDocuments, uploadedFinancialDocuments } = useSelector(state => state.kycDocuments)
  
  const nullId = import.meta.env.VITE_NULL_ID

  const checkStepStatus = (link) => {
    if(link === 'industry'){
      if (pathname.includes(link)) {
        return 'In Progress'
      } else {
        return 'Completed'
      }
    }
    else if (pathname.includes(link)) {
      return 'In Progress'
    } else {
      return 'Pending'
    }
  }

  const steps = [
    {
      step: 'Company details',
      status: (userCompanyInfo && userCompanyInfo?.user?.industryID !== nullId) ? 'Completed' : checkStepStatus('industry'),
      // status: user?.progress?.industry || 'In Progress',
      link: 'industry',
    },
    {
      step: 'Nature of operations',
      status: userCompanyInfo?.companySector ? 'Completed' : checkStepStatus('all-you-do'),
      // status: user?.progress?.companySector || 'Pending',
      link: 'all-you-do',
    },
    {
      step: 'Products required',
      // status:user?.companyProducts ? 'Completed' : checkStepStatus('company-products'),
      status: userCompanyInfo?.companyProducts ? 'Completed' : checkStepStatus('company-products'),
      link: 'company-products',
    },
    {
      step: 'Preferences',
      status: (userCompanyInfo?.companyPreferences) ? 'Completed' : checkStepStatus('preferences'),
      // status:user?.progress?.preferences || 'Pending',
      link: 'preferences',
    },
    {
      step: 'KYC Document',
      status: (userCompanyInfo?.userAttachments && userCompanyInfo?.userAttachments[0]?.kycDocument) ? 'Completed' : checkStepStatus('kyc-documents'),
      // status:user?.progress?.kycDocuments || 'Pending',
      link: 'kyc-documents',
    },
    {
      step: 'Data Upload',
      status: (userCompanyInfo?.userAttachments && userCompanyInfo?.userAttachments[0]?.companyDocument) ? 'Completed' : checkStepStatus('financial-documents'),
      // status:'Pending',
      link: 'financial-documents',
    },
    {
      step: 'Terms Sheet',
      status: (userCompanyInfo?.userTermSheet) ? 'Completed' : checkStepStatus('terms-sheet'),
      // status:'Pending',
      link: 'terms-sheet',
    }
  ]

  const stepClass = (status) => {
    return (status === 'Pending') ? 'step-pending' : (status === 'Completed') ? 'step-completed' : 'step-in-progress'
  }
  const stepIcon = (status) => {
    return (status === 'Pending') ? PendingStepIcon : (status === 'Completed') ? CompletedStepIcon : InProgressStepIcon
  }

  const handleNavigate = (step) => {
    if (userCompanyInfo?.user?.industryID !== nullId) {
      navigate(`${step.link}`)
    } else {
      navigate('industry')
    }
  }

  return (
    <div className='onboarding-progress-container'>
      <h2>{user?.companyName || ''}</h2>
      <p>Complete these steps for register yourself</p>
      {
        steps.map((step, index) => (
          <div key={index} className={`onboarding-step ${stepClass(step.status) || ''}`} onClick={() => handleNavigate(step)}>
            <h3>{step.step}</h3>
            <p>{step.status}</p>
            <img src={stepIcon(step.status)} alt="step status icon" className='step-icon' />
          </div>
        ))
      }
    </div>
  )
}

export default StepProgress
