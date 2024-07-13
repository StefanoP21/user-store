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

    static validateToken<T>(token: string, seed: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, seed, (err, decoded) => {
                if (err) return resolve(null);

                resolve(decoded as T);
            });
        });
    }
}
