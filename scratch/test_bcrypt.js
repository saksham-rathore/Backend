import bcrypt from "bcrypt";
const password = "[PASSWORD]";
const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(password, hash);
console.log("Hash:", hash);
console.log("Match:", match);

// $2b$10$54c141x2rWJjF6d7H2/uXeFfU4dY0O8R0hP3d3K6bL1C3d5F7G9H0
// $2b$10$B5T7821J7wW4mO01uD5Q3O1s0U7T9F2F7H1W7V2X6Q1G4X2P3B