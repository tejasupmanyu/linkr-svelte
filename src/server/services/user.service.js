import { User } from "../mysql/models";
import BaseService from "./base.service";
import _ from "lodash";
import {
  uniqueNamesGenerator,
  starWars,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async findUserByEmail(email) {
    return await this.find({
      where: {
        email,
      },
    });
  }

  async findUserByUsername(username) {
    return await this.find({
      where: {
        username,
      },
    });
  }

  async createUserByGoogleProfile(googleProfile) {
    const profileJson = _.get(googleProfile, "_json", {});
    const initialUserName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, starWars, animals],
      length: 2,
      separator: "",
      style: "lowerCase",
    });
    if (!_.isEmpty(profileJson)) {
      const linkrProfilePayload = {
        firstName: profileJson.given_name,
        lastName: profileJson.family_name,
        email: profileJson.email,
        profileImageUrl: profileJson.picture,
        displayName: profileJson.name,
        username: initialUserName,
      };
      return await this.create(linkrProfilePayload);
    } else {
      throw Error("Could not create user. Google Profile JSON empty!");
    }
  }

  async findUserOrCreateByGoogleProfile(googleProfile) {
    const userEmail = _.get(googleProfile, "_json.email", "");
    const existingUser = await this.findUserByEmail(userEmail);
    if (_.isEmpty(existingUser)) {
      // no user with the email exists, create one
      return await this.createUserByGoogleProfile(googleProfile);
    } else {
      return existingUser[0];
    }
  }
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;
