import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { BookOpen, Users, Clock } from 'lucide-react';
import { mockClasses } from '../../services/mockData';

interface Class {
  id: string;
  className: string;
  subject: string;
  students: number;
  schedule: string;
}

const TeacherClasses: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClasses(mockClasses);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <DashboardLayout title="My Classes">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="hidden text-2xl font-bold text-foreground sm:block">My Classes</h1>
          <p className="text-sm text-muted-foreground">Total: {classes.length} classes assigned</p>
        </div>

        {/* Classes Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Active
                  </span>
                </div>

                <h3 className="font-bold text-foreground text-lg">{cls.className}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cls.subject}</p>

                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Users size={16} className="text-muted-foreground" />
                    <span>{cls.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="truncate">{cls.schedule}</span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-lg bg-primary py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherClasses;
