import express, { NextFunction, Request, Response } from "express";
import verifyToken from "./verifyToken";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req, res) => {
	const { username, password } = req.body;
	// Add signup logic here
	res.status(201).send({ message: "User signed up successfully" });
});

app.post("/signin", (req, res) => {
	const { username, password } = req.body;
	// Add signin logic here
	res.status(200).send({ message: "User signed in successfully" });
});

app.post(
	"/create-room",
	verifyToken,
	(req: Request, res: Response, next: NextFunction) => {
		const { roomName } = req.body;
		// Add create room logic here
		res.status(201).send({
			message: `Room ${roomName} created successfully`,
		});
	}
);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
