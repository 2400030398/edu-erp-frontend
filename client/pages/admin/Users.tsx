import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { mockAllUsers } from '../../services/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student', department: '' });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockAllUsers);
      setFilteredUsers(mockAllUsers);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole) {
      filtered = filtered.filter((u) => u.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterRole, users]);

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'student', department: '' });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, department: user.department });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...formData } : u
        )
      );
    } else {
      const newUser: User = {
        id: Math.random().toString(),
        ...formData,
        status: 'active',
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout title="Manage Users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="hidden text-2xl font-bold text-foreground sm:block">Users Management</h1>
            <p className="text-sm text-muted-foreground">Total: {filteredUsers.length} users</p>
          </div>
          <button
            onClick={handleAddUser}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
            Add User
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                    <td className="px-6 py-4 text-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground">{user.department}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="rounded-lg p-2 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="rounded-lg p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {editingUser ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
