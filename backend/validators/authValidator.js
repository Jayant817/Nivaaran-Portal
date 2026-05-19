const validateSignup =
(data) => {

  if (
    !data.name ||
    !data.email ||
    !data.password
  ) {

    return {
      error: {
        details: [
          {
            message:
            'All Fields Are Required'
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
            'Invalid Email'
          }
        ]
      }
    }
  }

  if (
    data.password.length < 6
  ) {

    return {
      error: {
        details: [
          {
            message:
            'Password Must Be At Least 6 Characters'
          }
        ]
      }
    }
  }

  return { error: null }
}

const validateLogin =
(data) => {

  if (
    !data.email ||
    !data.password
  ) {

    return {
      error: {
        details: [
          {
            message:
            'Email And Password Required'
          }
        ]
      }
    }
  }

  return { error: null }
}

module.exports = {

  validateSignup,
  validateLogin
}