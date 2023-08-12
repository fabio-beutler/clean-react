import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .post((req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }
    if (password !== "123456") {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.json({ accessToken: "Here is your access token!" });
  })
  .get((req, res) => {
    return res.json({ message: "Hello, world!" });
  });

export default router.handler({
  onError: (err, req, res) => {
    // @ts-ignore
    console.error(err.stack);
    // @ts-ignore
    res.status(err.statusCode || 500).end(err.message);
  },
});
