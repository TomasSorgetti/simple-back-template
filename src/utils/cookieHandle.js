const generateCookie = (res, refreshToken, refreshExpires) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: refreshExpires,
  });
};
const deleteCookie = (res) => {
  res.clearCookie("refreshToken");
};

module.exports = { generateCookie, deleteCookie };
