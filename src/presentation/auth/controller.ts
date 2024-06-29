import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';

export class AuthController {
  //* DI
  constructor(public readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.register(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.status(200).json({ user }))
      .catch((error) => res.status(400).json({ error }));
  };

  loginUser = (req: Request, res: Response) => {
    res.json('loginUser');
  };

  validateEmail = (req: Request, res: Response) => {
    res.json('validateEmail');
  };
}
