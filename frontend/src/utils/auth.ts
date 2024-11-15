export const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const clearToken = () => {
    localStorage.removeItem('accessToken');
};
