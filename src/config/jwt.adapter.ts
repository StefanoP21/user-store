import jwt from 'jsonwebtoken';

export class JwtAdapter {
  //? DI
  static async generateToken(
    payload: any,
    seed: string,
    duration: string = '2h'
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, seed, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  static validateToken(token: string) {
    throw new Error('Not implemented');
  }
}
