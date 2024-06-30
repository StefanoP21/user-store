import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthService {
  //* DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(registerUserDto);

      //* encrypt password
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      //* jwt
      const token = await JwtAdapter.generateToken(
        { id: user.id },
        envs.JWT_SEED
      );
      if (!token)
        throw CustomError.internalServerError('Error while generating jwt');

      //TODO: send email

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('Email not exist');

    const passwordValid = bcryptAdapter.compare(
      loginUserDto.password,
      user.password!
    );

    if (!passwordValid) throw CustomError.badRequest('Incorrect credentianls');
    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken(
      { id: user.id },
      envs.JWT_SEED
    );
    if (!token)
      throw CustomError.internalServerError('Error while generating jwt');

    return { user: userEntity, token };
  }
}
