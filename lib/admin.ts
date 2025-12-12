import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_36HDE1hJAxsHYqzgFWjCro1WqeK"
];

export const IsAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }
    
    return adminIds.indexOf(userId) !== -1;
};