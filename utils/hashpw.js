const bcrypt = require('bcrypt');

export const saltAndHashPassword = async (password) => {
    // Salt and Hash Password
    const salt = 5;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}