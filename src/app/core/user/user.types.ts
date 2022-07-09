export interface User
{
    id?: string;
    name?: string;
    email?: string;
    username?: string;
    role?: string;
    avatar?: string;
    status?: string;
    authorities?: {
        authority: string
    }[];
}
