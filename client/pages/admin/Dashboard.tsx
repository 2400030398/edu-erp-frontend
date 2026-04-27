import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Users, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { mockAllUsers, mockReports } from '../../services/mockData';

interface DashboardStats {
  totalUsers: number;
  totalTeachers: number;
  totalStudents: number;
  pendingReports: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    pendingReports: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const teachers = mockAllUsers.filter((u) => u.role === 'teacher').length;
      const students = mockAllUsers.filter((u) => u.role === 'student').length;
      const pending = mockReports.filter((r) => r.status === 'pending').length;

      setStats({
        totalUsers: mockAllUsers.length,
        totalTeachers: teachers,
        totalStudents: students,
        pendingReports: pending,
      });
      setIsLoading(false);
    }, 500);
  }, []);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {isLoading ? (
            <div className="mt-2 h-8 w-16 animate-pulse rounded bg-muted" />
          ) : (
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          )}
        </div>
        <div className={`rounded-lg ${color} p-3 text-primary-foreground`}>{Icon}</div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users size={24} />}
            label="Total Users"
            value={stats.totalUsers}
            color="bg-blue-500"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Teachers"
            value={stats.totalTeachers}
            color="bg-green-500"
          />
          <StatCard
            icon={<Users size={24} />}
            label="Students"
            value={stats.totalStudents}
            color="bg-purple-500"
          />
          <StatCard
            icon={<AlertCircle size={24} />}
            label="Pending Reports"
            value={stats.pendingReports}
            color="bg-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/admin/users"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <Users className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">Manage Users</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add, edit, or delete users and assign roles
              </p>
            </div>
          </Link>

          <Link
            to="/admin/reports"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all" />
            <div className="relative">
              <BarChart3 className="mb-3 text-primary" size={28} />
              <h3 className="font-semibold text-foreground">View Reports</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Monitor attendance, academic, and financial reports
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Reports</h2>
          <div className="space-y-3">
            {mockReports.slice(0, 3).map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between border-b border-border py-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{report.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {report.type} • {report.date}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    report.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
