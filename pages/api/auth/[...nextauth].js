import NextAuth from "next-auth";
//import Providers from "next-auth/providers";
import CredentialProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
//import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { FirebaseAdapter } from "./FirebaseAdapter";

import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    query,
    getDocs,
    where,
    limit,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

//export default (req, res) => NextAuth(req, res, options);

export default async function auth(req, res) {
    const isCorrectCredentials = (credentials) =>
        credentials.username === process.env.NEXTAUTH_USERNAME &&
        credentials.password === process.env.NEXTAUTH_PASSWORD;

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const firebaseClient = {
        db,
        collection,
        query,
        getDocs,
        where,
        limit,
        doc,
        getDoc,
        addDoc,
        updateDoc,
        deleteDoc,
    };
    let normalOptions = {
        session: {
            strategy: "database",
        },
        theme: { colorScheme: "light" },
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET,
            }),
            CredentialProvider({
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
        callbacks: {
            async session({ session, token, user }) {
                session.user.provider = user.provider;
                //session.accessToken = token.accessToken;
                //console.log(token, user, session);
                return session;
            },
        },
        adapter: FirebaseAdapter(firebaseClient),
    };
    let adminOptions = {
        theme: { colorScheme: "light" },
        providers: [
            CredentialProvider({
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
        callbacks: {
            async jwt({ token, account }) {
                if (account) {
                    token.accessToken = account.access_token;
                }
                return token;
            },
        },
    };
    if (!(req.headers.referer && req.headers.referer.includes("admin"))) {
        normalOptions.providers.pop();
    }
    if (req.headers.referer && req.headers.referer.includes("admin")) {
        normalOptions = adminOptions;
    }
    return await NextAuth(req, res, normalOptions);
}
/*
const options = {
    theme: { colorScheme: "light" },
    providers: [
        GoogleProvider({
            clientId:
                "301249403569-6818astof7ahgagiufg6pl4ls6ja3u7q.apps.googleusercontent.com",
            clientSecret: "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",
        }),
        CredentialProvider({
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
    adapter: FirebaseAdapter(firebaseClient),
};
*/
