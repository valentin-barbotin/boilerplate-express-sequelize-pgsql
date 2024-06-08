import { Sequelize } from "sequelize";
import { User } from "../models";

export class UserService {
    private static _instance: UserService;

    public static get instance() {
        if (!this._instance) {
            this._instance = new UserService();
        }
        return this._instance;
    }

    async getUsers() {
        return User.findAll();
    }

    async getUser(id: number) {
        return User.findByPk(id);
    }

    async createUser(user) {
        // Create user in database
    }

    async updateUser(user) {
        // Update user in database
    }

    async deleteUser(id: number) {
        User.destroy({
            where: {
                id: id
            }
        });
    }
    
    async authenticate(username: string, password: string) {
        // Authenticate user
    }

    async changePassword(username: string, password: string) {
        // Change user password
    }

    async resetPassword(username: string) {
        // Reset user password
    }

    async register(username: string, password: string) {
        // Register user
    }
}
