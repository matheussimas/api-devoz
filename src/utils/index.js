function isUserValid(user) {
    const { nome, email, idade } = user;
    return nome && email && idade >= 18;
}

module.exports = { isUserValid };