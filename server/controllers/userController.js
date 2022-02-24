export const getSignup = (req, res) => {
  return res.send({pageTitle: "SignUp"});
}

export const postSignup = (req, res) => {
  const data = req.body;
  console.log(data);
  res.send({text: "text"});
}