const { ConflictError } = require("../utils/error")
const {generateAndStoreotp} = require("../utils/otp")
const {sendOtpEmail} = require("../utils/email")
const bcrypt = require('bcrypt');
const prisma = require("../config/prisma")


const sendOTP = async(firstName, lastName, email,  password) => {
    const existingUser = await  Prisma.user.findUnique({
        where: {email}
    })

    if(existingUser) {
        throw new conflictError("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const meta = {firstName, lastName, email, hashedPassword};
    const { otp, otpSessionId } = await generateAndStoreotp(meta);
    await sendOtpEmail(email, otp);
    return {otpSessionId}
}

module.exports = {sendOTP};