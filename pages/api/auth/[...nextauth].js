import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isCorrectCredentials = (credentials) =>
    credentials.username === process.env.NEXTAUTH_USERNAME &&
    credentials.password === process.env.NEXTAUTH_PASSWORD;

const options = {
    theme: { colorScheme: "light" },
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Enter Admin Id",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (isCorrectCredentials(credentials)) {
                    const user = { id: 1, name: "Admin" };
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }
            },
        }),
    ],
};

export default (req, res) => NextAuth(req, res, options);
