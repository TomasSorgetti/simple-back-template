/**
 * retorna un objeto con la informacion del usuario
 * @returns
 */
const getUser = async () => {
  return {
    id: 1,
    name: "John",
    lastname: "Doe",
    email: "XrN5S@example.com",
    userVerified: true,
  };
};

module.exports = {
  getUser,
};
