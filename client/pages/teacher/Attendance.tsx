import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Check, X, Save } from 'lucide-react';
import { mockAttendance } from '../../services/mockData';

interface AttendanceRecord {
  id: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent';
  rollNumber: string;
}

const TeacherAttendance: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAttendance(mockAttendance);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleStatusChange = (id: string, status: 'present' | 'absent') => {
    setAttendance(
      attendance.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const handleSubmit = () => {
    setMessage('Attendance saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;

  return (
    <DashboardLayout title="Manage Attendance">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="hidden text-2xl font-bold text-foreground sm:block">Attendance Management</h1>
            <p className="text-sm text-muted-foreground">Total: {attendance.length} students</p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="rounded-lg bg-green-100 p-4 text-green-800">
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground font-medium">TOTAL</p>
            <p className="text-2xl font-bold text-foreground mt-1">{attendance.length}</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-xs text-green-700 font-medium">PRESENT</p>
            <p className="text-2xl font-bold text-green-800 mt-1">{presentCount}</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-xs text-red-700 font-medium">ABSENT</p>
            <p className="text-2xl font-bold text-red-800 mt-1">{absentCount}</p>
          </div>
        </div>

        {/* Attendance Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Roll No.</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Student Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{record.rollNumber}</td>
                    <td className="px-6 py-4 text-foreground">{record.studentName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(record.id, 'present')}
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                            record.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Check size={14} />
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(record.id, 'absent')}
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                            record.status === 'absent'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <X size={14} />
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Save size={20} />
            Save Attendance
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAttendance;
