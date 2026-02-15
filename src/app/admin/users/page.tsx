import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Mail, MoreHorizontal, ShieldAlert, X } from "lucide-react";

const USERS = [
    {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        role: "Buyer",
        status: "Active",
        joined: "Jan 12, 2024",
    },
    {
        id: "2",
        name: "Prestige Motors Sydney",
        email: "sales@prestigemotors.com",
        role: "Dealer",
        status: "Active",
        joined: "Feb 10, 2023",
    },
    {
        id: "3",
        name: "Banned User",
        email: "spammer@test.com",
        role: "Buyer",
        status: "Banned",
        joined: "Yesterday",
    },
];

export default function AdminUsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage platform users and permissions.</p>
                </div>
            </div>

            <div className="border rounded-lg bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {USERS.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="outline">{user.role}</Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                                        {user.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{user.joined}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8" title="Contact">
                                            <Mail className="h-4 w-4" />
                                        </Button>
                                        {user.status === 'Active' ? (
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Ban User">
                                                <ShieldAlert className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" title="Unban User">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
