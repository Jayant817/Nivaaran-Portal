const validateComplaint =
(data) => {

  if (
    !data.name ||
    !data.email ||
    !data.title ||
    !data.description ||
    !data.category ||
    !data.location
  ) {

    return {
      error: {
        details: [
          {
            message:
            'All Complaint Fields Are Required'
          }
        ]
      }
    }
  }

  if (
    !data.email.includes('@')
  ) {

    return {
      error: {
        details: [
          {
            message:
            'Invalid Email Address'
          }
        ]
      }
    }
  }

  return { error: null }
}

module.exports =
validateComplaint