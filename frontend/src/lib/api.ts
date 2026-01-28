const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token') || sessionStorage.getItem('token');
        }
        return null;
    }

    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const url = `${this.baseUrl}${endpoint}`;
        const config: RequestInit = {
            ...options,
            signal: controller.signal,
            headers: {
                ...this.getHeaders(),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error('Server not responding');
            }
            throw error;
        } finally {
            clearTimeout(timeout);
        }
    }


    // Auth methods
    async register(userData: {
        name: string;
        email: string;
        password: string;
        role?: string;
    }) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async login(credentials: { email: string; password: string }, rememberMe: boolean = false) {
        const response = await this.request<{ token: string; user: any }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        if (response.token && typeof window !== 'undefined') {
            const storage = rememberMe ? localStorage : sessionStorage;
            // Clear current to avoid mixed states
            this.logout();

            storage.setItem('token', response.token);
            storage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    }

    getUser() {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        }
        return null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    async forgotPassword(email: string) {
        const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Error al solicitar recuperación');
        }
        return await response.json();
    }

    async resetPassword(token: string, password: string) {
        const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Error al restablecer contraseña');
        }
        return await response.json();
    }

    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        }
    }

    async verifyPassword(password: string) {
        return this.request('/auth/verify-password', {
            method: 'POST',
            body: JSON.stringify({ password }),
        });
    }

    // User methods
    async getProfile() {
        return this.request('/users/me');
    }

    async updateProfile(data: { name?: string; email?: string }) {
        return this.request('/users/me', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async changePassword(data: { currentPassword: string; newPassword: string }) {
        return this.request('/users/me/password', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Entrepreneurship methods
    async createEntrepreneurship(data: any) {
        return this.request('/entrepreneurships', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getEntrepreneurships() {
        return this.request('/entrepreneurships');
    }

    async getEntrepreneurship(id: number) {
        return this.request(`/entrepreneurships/${id}`);
    }

    async updateEntrepreneurship(
        id: number,
        data: any
    ) {
        return this.request(`/entrepreneurships/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteEntrepreneurship(id: number) {
        return this.request(`/entrepreneurships/${id}`, {
            method: 'DELETE',
        });
    }

    // Plan methods
    async createPlan(data: any) {
        return this.request('/plans', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getPlans() {
        return this.request('/plans');
    }

    async getPlan(id: number) {
        return this.request(`/plans/${id}`);
    }

    async updatePlan(id: number, data: any) {
        return this.request(`/plans/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deletePlan(id: number) {
        return this.request(`/plans/${id}`, {
            method: 'DELETE',
        });
    }

    async deleteDocument(id: number) {
        return this.request(`/documents/${id}`, {
            method: 'DELETE',
        });
    }

    async exportPlan(id: number) {
        const token = this.getToken();
        const url = `${this.baseUrl}/plans/${id}/export`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `plan_economico.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
    }
    async uploadImage(endpoint: string, file: File, extraData: any = {}) {
        const formData = new FormData();
        if (extraData.type) formData.append('type', extraData.type);
        formData.append('image', file);

        const token = this.getToken();
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Error in upload' }));
            throw new Error(error.error || 'Error in upload');
        }

        return response.json();
    }
}

export const api = new ApiClient(API_URL);
export default api;
