function getDefaultUsername(email) {
  return email ? email.split("@")[0] : `user_${Date.now()}`;
}

export default getDefaultUsername;
