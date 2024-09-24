import axios from 'axios';
import { Demo } from '@/types';

class UserService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:8080/users';
    }

    private getAuthHeaders() {
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.error('No token found in localStorage');
            throw new Error('No token found');
        }
        return {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        };
    }

    async getUsers(): Promise<Demo.User[]> {
        try {
            const response = await axios.get<Demo.User[]>(this.baseUrl, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async createUser(user: { name: string; email: string; password: string; role: string }): Promise<Demo.User> {
        try {
            const response = await axios.post<Demo.User>('http://localhost:8080/auth/signup', user, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async updateUser(user: Demo.User): Promise<Demo.User> {
        try {
            const response = await axios.put<Demo.User>(`${this.baseUrl}/${user.id}`, { ...user, defaultShippingAddress: 0 }, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            await axios.delete(`${this.baseUrl}/${userId}`, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}

export { UserService };