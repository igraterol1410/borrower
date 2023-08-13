const getIndustrySubIndustries = (subindustries,industryId) => {
    const industrySubindustries = subindustries.filter((subindustry)=>subindustry.industryId===industryId)
    return industrySubindustries.length > 0 ? industrySubindustries : null
  }

  const filteredIndustries = (industries,value) => {
    const filteredIndustry = industries.filter((industry)=>(industry.code.toLowerCase().includes(value.toLowerCase())))
    return filteredIndustry
  }
  
  export {
    getIndustrySubIndustries,
    filteredIndustries
  }