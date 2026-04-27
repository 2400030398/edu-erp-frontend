import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Edit2, Save, X, Mail, Phone, MapPin, User, Calendar } from 'lucide-react';
import { mockStudentProfile } from '../../services/mockData';

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
  joinDate: string;
  currentGrade: string;
  section: string;
  profilePhoto: string;
}

const StudentProfile: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<StudentProfile>(mockStudentProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const InfoField = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-primary/10 p-3 text-primary">{Icon}</div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase">{label}</p>
        {isEditing && label.toLowerCase() !== 'roll number' && label.toLowerCase() !== 'current grade' ? (
          <input
            type="text"
            value={editData[label.toLowerCase().replace(/\s+/g, '') as keyof StudentProfile] as string || ''}
            onChange={(e) => {
              const key = label.toLowerCase().replace(/\s+/g, '') as keyof StudentProfile;
              setEditData({ ...editData, [key]: e.target.value });
            }}
            className="mt-1 rounded-lg border border-input bg-background px-3 py-1 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        ) : (
          <p className="mt-1 font-medium text-foreground text-lg">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        {/* Success Message */}
        {message && (
          <div className="rounded-lg bg-green-100 p-4 text-green-800">
            {message}
          </div>
        )}

        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 sm:flex-row sm:items-start">
          <img
            src={profile.profilePhoto}
            alt={profile.name}
            className="h-24 w-24 rounded-full object-cover border-4 border-primary/20"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {profile.currentGrade} • {profile.section}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Roll Number: {profile.rollNumber}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Student
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                Active
              </span>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 transition-colors"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Personal Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InfoField
              icon={<User size={20} />}
              label="Email"
              value={profile.email}
            />
            <InfoField
              icon={<Phone size={20} />}
              label="Phone"
              value={profile.phone}
            />
            <InfoField
              icon={<Calendar size={20} />}
              label="Date of Birth"
              value={new Date(profile.dateOfBirth).toLocaleDateString()}
            />
            <InfoField
              icon={<MapPin size={20} />}
              label="Address"
              value={profile.address}
            />
          </div>
        </div>

        {/* Parent Information */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Parent/Guardian Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Parent Name</p>
                <p className="mt-1 font-medium text-foreground text-lg">{profile.parentName}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Parent Phone</p>
                <p className="mt-1 font-medium text-foreground text-lg">{profile.parentPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Academic Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Enrollment Date</p>
                <p className="mt-1 font-medium text-foreground text-lg">
                  {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">Current Status</p>
                <p className="mt-1 font-medium text-foreground text-lg">Active Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
