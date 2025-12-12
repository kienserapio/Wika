import { redirect } from "next/navigation";
import { IsAdmin } from "@/lib/admin";
import AdminClient from "./AdminClient";

const AdminPage = async () => {
    const isAdmin = await IsAdmin();

    if (!isAdmin) {
        redirect("/");
    }

    return (
        <div>
            <AdminClient />
        </div>
    );
};

export default AdminPage;