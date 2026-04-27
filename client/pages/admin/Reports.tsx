import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Download, Filter, BarChart3, Users, TrendingUp } from 'lucide-react';
import { mockReports } from '../../services/mockData';

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  department: string;
  status: string;
}

const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [filterType, setFilterType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (filterType) {
      filtered = filtered.filter((r) => r.type === filterType);
    }

    if (filterStatus) {
      filtered = filtered.filter((r) => r.status === filterStatus);
    }

    setFilteredReports(filtered);
  }, [filterType, filterStatus, reports]);

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Users className="text-blue-500" size={20} />;
      case 'academic':
        return <TrendingUp className="text-green-500" size={20} />;
      case 'finance':
        return <BarChart3 className="text-purple-500" size={20} />;
      default:
        return <BarChart3 size={20} />;
    }
  };

  return (
    <DashboardLayout title="Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="hidden text-2xl font-bold text-foreground sm:block">Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground">Total: {filteredReports.length} reports</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Download size={20} />
            Export All
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Report Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Types</option>
              <option value="attendance">Attendance</option>
              <option value="academic">Academic</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="rounded-lg bg-secondary p-2">{getReportIcon(report.type)}</div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      report.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{report.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)} • {report.date}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Department: {report.department}</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  <Download size={16} />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {filteredReports.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 py-12">
            <BarChart3 className="mb-3 text-muted-foreground" size={40} />
            <p className="text-foreground font-medium">No reports found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
