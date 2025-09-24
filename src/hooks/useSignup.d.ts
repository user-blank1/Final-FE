export declare const useSignup: () => {
    signup: (username: string, email: string, password: string) => Promise<{
        success: boolean;
        error: any;
    } | undefined>;
    loading: boolean;
    error: string | null;
};
