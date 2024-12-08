import bcrypt from "bcryptjs";

const users = [
  {
    name: "Muhammad makanta",
    email: "mktedozhigi@gmail.com",
    password: bcrypt.hashSync("mkt1MAKANTA", 10),
    isAdmin: true,
  },
  {
    name: "Makanta ibrahim",
    email: "makanta66573@gmail.com",
    password: bcrypt.hashSync("mkt1MAKANTA", 10),
    isAdmin: false,
  },
  {
    name: "ibrahim muhammad",
    email: "makanta66574@gmail.com",
    password: bcrypt.hashSync("mkt1MAKANTA", 10),
    isAdmin: false,
  },
];

export default users;
