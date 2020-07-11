const bcrypt = require('bcrypt');
const saltRounds = 10; 

module.exports = {
    async hashPassword(passwordToHash) {
        return await bcrypt.hash(passwordToHash, saltRounds);
    },
    async matchPassword(userPassword, hash) {
        const match = await bcrypt.compare(userPassword, hash);
        return match;
    }
}