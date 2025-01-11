import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = "mysecretkey";

interface DecodedToken {
	userId: string;
	iat: number;
	exp: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers["authorization"];

	if (!token) {
		res.status(403).send({ message: "No token provided!" });
		return next();
	}

	const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

	if (!decodedToken) {
		res.status(401).send({ message: "Unauthorized!" });
		return next();
	}

	req.body.userId = decodedToken.userId;

	next();
};

export default verifyToken;
