import NextAuth, { Account, User } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
//import { FirebaseAdapter, FirebaseClient } from "@next-auth/firebase-adapter";
import { FirebaseAdapter, FirebaseClient } from "./FirebaseAdapter";

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
    runTransaction,
} from "firebase/firestore";
import { JWT } from "next-auth/jwt";

//export default (req, res) => NextAuth(req, res, options);

export default async function auth(req: any, res: any) {
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
    const firebaseClient: FirebaseClient = {
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
        runTransaction,
    };
    const normalOptions = {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET,
            }),
        ],
        callbacks: {
            async jwt({
                token,
                user,
                account,
            }: {
                token: JWT;
                user?: User | undefined;
                account?: Account | undefined;
            }) {
                if (user?.email === process.env.NEXTAUTH_ADMIN_ADDRESS) {
                    token.role = "admin";
                }
                return token;
            },
        },
        secret: process.env.NEXTAUTH_SECRET,
        adapter: FirebaseAdapter(firebaseClient),
    };
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
