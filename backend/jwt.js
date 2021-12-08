import jwt from 'jsonwebtoken'

const JWT_SECRET = "this is secret zz"

export function signin(user) {
    const payload = {
      user_id: user.user_id
    };

    return jwt.sign(payload, JWT_SECRET, { 
      algorithm: 'HS256',
      expiresIn: '5s',
    });
}
  
export function verify(token) {
    return jwt.verify(token, JWT_SECRET);
}
