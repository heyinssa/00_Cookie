import { verify } from './jwt.js'

export function auth(req, res, next) {
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
		const token = req.headers.authorization.split('Bearer ') [1];
		
		try {
			const decoded = verify(token);
			console.log(decoded)
			req.user = { user_id: decoded.user_id }
			return next()
		} catch (err) {
			return res.status(401).json({ "message" : "No Authorizated!" });
		}
	}
	
	return res.status(401).json({ "message" : "No Authorizated!" });
}
