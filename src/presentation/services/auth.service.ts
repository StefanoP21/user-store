import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';

export class AuthService {
  //* DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(registerUserDto);
      await user.save();

      //todo: encrypt password

      //todo: jwt

      //todo: send email

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token: ' abc' };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}
