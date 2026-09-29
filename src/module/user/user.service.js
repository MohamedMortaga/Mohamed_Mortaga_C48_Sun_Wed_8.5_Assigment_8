import { findByIdDoc } from "../../DB/db.repo.js";
import userModel from "../../DB/model/user.model.js";
import { BadRequestException, NotFoundException } from "../../common/exceptions/app.exceptions.js";
import { decryptValue } from "../../common/security/encryption.js";

// Profile - return the logged-in user's data with the phone decrypted.
export async function profile(id) {
  if (!id) {
    throw BadRequestException({ errMsg: "'id' query param is required (simulated logged-in user)." });
  }

  const user = await findByIdDoc({ model: userModel, id });
  if (!user || user.isDeleted) {
    throw NotFoundException({ errMsg: "User not found" });
  }

  if (user.phone) {
    user.phone = decryptValue({ cipherValue: user.phone });
  }

  return user;
}
