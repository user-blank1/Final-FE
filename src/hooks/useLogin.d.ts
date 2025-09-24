export declare const useLogin: () => {
    login: (username: string, password: string) => Promise<void>;
    loading: boolean;
    error: string | null;
};
