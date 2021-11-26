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
        apiKey: "AIzaSyAdL6jyT9UmimxQrTN6Lll7gJUzfFY5bBo",
        authDomain: "arknightsu.firebaseapp.com",
        projectId: "arknightsu",
        storageBucket: "arknightsu.appspot.com",
        messagingSenderId: "301249403569",
        appId: "1:301249403569:web:1a89b81dc6e7c0337aa090",
        measurementId: "G-HS02MS49SE",
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
    const normalOptions = {
        theme: { colorScheme: "light" },
        providers: [
            GoogleProvider({
                clientId:
                    "301249403569-6818astof7ahgagiufg6pl4ls6ja3u7q.apps.googleusercontent.com",
                clientSecret: "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",
            }),
        ],
        adapter: FirebaseAdapter(firebaseClient),
    };
    const adminOptions = {
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
    };
    //console.log(req.headers);
    if (req.headers.referer && req.headers.referer.includes("admin")) {
        console.log("ADMIN REQUESTED");
        return await NextAuth(req, res, adminOptions);
    } else {
        return await NextAuth(req, res, normalOptions);
    }
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
