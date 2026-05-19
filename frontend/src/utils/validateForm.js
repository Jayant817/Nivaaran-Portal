export const validateEmail = (email) => {

  return email.includes('@')
}

export const validatePassword =
(password) => {

  return password.length >= 6
}

export const validateComplaint =
(data) => {

  if (
    !data.name ||
    !data.email ||
    !data.title ||
    !data.description
  ) {
    return false
  }

  return true
}