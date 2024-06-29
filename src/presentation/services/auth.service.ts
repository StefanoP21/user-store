import { UserModel } from '../../data';
import { CustomError, RegisterUserDto } from '../../domain';

export class AuthService {
  //* DI
  constructor() {}

  public async registerUser(dto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: dto.email });

    if (existUser) throw CustomError.badRequest('Email already exist');

    return 'ok';
  }
}
