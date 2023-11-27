// Permission types
export type Permission = {
    action: string;
    function: string;
    subject: string;
};

// Role Types
export type Role = {
    name: string;
    permissions: string[];
};
