import { createDoc, findOneDoc } from "../../DB/db.repo.js";
import userModel from "../../DB/model/user.model.js";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/app.exceptions.js";
import { compareHash, hashValue } from "../../common/security/hash.js";
import { decryptValue, encryptValue } from "../../common/security/encryption.js";
import { HashToolEnum } from "../../common/enum/hash.enum.js";

// Signup - email must be unique, password is hashed and phone is encrypted before saving.
export async function signup(userData = {}) {
  const { username, firstName, lastName, email, password, phone, gender, DOB } = userData;

  if (!email || !password) {
    throw BadRequestException({ errMsg: "email and password are required" });
  }

  const userEmail = await findOneDoc({ model: userModel, filter: { email } });
  if (userEmail) {
    throw ConflictException({ errMsg: "Email already exists" });
  }

  const [newUser] = await createDoc({
    model: userModel,
    insertedData: {
      ...(username ? { username } : { firstName, lastName }),
      email,
      password: await hashValue({ value: password, tool: HashToolEnum.ARGON }),
      phone: phone ? encryptValue({ value: phone }) : undefined,
      gender,
      DOB,
    },
  });

  return newUser;
}

// Login - verify email + password against the stored hash.
export async function login(userData = {}) {
  const { email, password } = userData;

  if (!email || !password) {
    throw BadRequestException({ errMsg: "email and password are required" });
  }

  const user = await findOneDoc({ model: userModel, filter: { email } });

  if (!user) {
    throw NotFoundException({ errMsg: "Invalid Email or Password" });
  }

  const isMatch = await compareHash({
    value: password,
    hash: user.password,
    tool: HashToolEnum.ARGON,
  });

  if (!isMatch) {
    throw NotFoundException({ errMsg: "Invalid Email or Password" });
  }

  if (user.phone) {
    user.phone = decryptValue({ cipherValue: user.phone });
  }

  return user;
}
