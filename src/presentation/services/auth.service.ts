import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { EmailService } from './email.service';

export class AuthService {
  //* DI
  constructor(private readonly emailService: EmailService) {}

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
        throw CustomError.internalServerError('Error while generating token');

      //* send email
      this.sendEmailValidationLink(user.email!);

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
      throw CustomError.internalServerError('Error while generating token');

    return { user: userEntity, token };
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email }, envs.JWT_SEED);
    if (!token)
      throw CustomError.internalServerError('Error while generating token');

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      html,
    };

    const isSet = await this.emailService.sendEmail(options);

    if (!isSet) throw CustomError.internalServerError('Error sending email');

    return true;
  };
}
