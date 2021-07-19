import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

import firebaseConfig from './config';



class Firebase {
    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.database = app.database();
    }

    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        await newUser.user.updateProfile({ displayName: name });
        return newUser;
    }

    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password)
    }

    async logout() {
        await this.auth.signOut();
    }

    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }

    async getAllUsers() {
        const snapshot = await this.database.ref('ar-create/users').once('value');
        return Object.values(snapshot.val());
    }

    async getUser(userId) {
        const snapshot = await this.database.ref(`ar-create/users/${userId}`).once('value');
        return snapshot.val();
    }

    async setNewUser(newUserData) {
        await this.database.ref(`ar-create/users/${newUserData.id}`).set(newUserData);
    }

}

const firebase = new Firebase();
export default firebase;