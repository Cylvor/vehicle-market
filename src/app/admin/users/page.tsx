import { getAdminUsers } from "@/actions/user";

export default async function AdminUsersPage() {
    const users = await getAdminUsers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">View user contact and profile details.</p>
                </div>
            </div>

            <div className="border rounded-md bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.length === 0 ? (
                            <tr>
                                <td className="px-6 py-8 text-center text-muted-foreground" colSpan={5}>
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        {user.imageUrl ? (
                                            <img
                                                src={user.imageUrl}
                                                alt={user.name || "User image"}
                                                className="h-10 w-10 rounded-md object-cover border"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-muted border" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium">{user.name || "N/A"}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.location || "N/A"}</td>
                                    <td className="px-6 py-4">{user.phone || "N/A"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
