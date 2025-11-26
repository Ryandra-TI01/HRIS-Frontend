import { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import InformationSection from "../components/InformationSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageHeader from "../../../components/PageHeader";
import Loading from "../../../components/Loading";
import { getProfileRequest } from "../api/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch performance reviews with filters and pagination
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfileRequest();
      setProfile(data.data);
    } catch (err) {
      console.error("Failed to fetch performance reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/employee/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>My Profile</PageHeader>

      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <ProfileHeader user={profile} />

          <InformationSection
            title="Personal Information"
            items={[
              { label: "Full Name", value: profile.name },
              { label: "Email", value: profile.email },
              { label: "Phone", value: profile.profile.contact || "-" },
              {
                label: "Employment Status",
                value: profile.profile.employment_status,
              },
            ]}
          />

          <InformationSection
            title="Employment Information"
            items={[
              { label: "Employee Code", value: profile.profile.employee_code },
              { label: "Position", value: profile.profile.position },
              { label: "Department", value: profile.profile.department },
              { label: "Join Date", value: profile.profile.join_date },
            ]}
          />

          <InformationSection
            title="System Information"
            items={[
              { label: "Role", value: profile.role },
              {
                label: "Account Active",
                value: profile.status_active ? "Active" : "Inactive",
              },
              {
                label: "Manager",
                value: profile.profile.manager
                  ? `${profile.profile.manager.name}`
                  : "-",
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
