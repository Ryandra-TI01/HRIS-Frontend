import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import {
  Users,
  UserPlus,
  Clock,
  CalendarCheck,
  FileText,
  Star,
} from "lucide-react";

export default function LandingPage() {
  const images = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1512403754473-27835f7b9984?w=800&auto=format&fit=crop&q=60",
  ];

  const [carouselApi, setCarouselApi] = useState(null);

  // Auto-play carousel every 3s
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* ========================= HERO SECTION ========================= */}
      <section
        id="home"
        className="flex flex-col lg:flex-row justify-between items-center px-8 md:px-16 py-20 gap-12"
      >
        {/* LEFT CONTENT */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Empower Your Workforce with
            <span className="text-primary"> Smarter HR Management</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            Manage your employees effortlessly with an integrated platform for
            attendance, payroll, and performance.
          </p>

          <Link to="/login">
            <Button
              size="lg"
              className="px-8 py-6 text-lg shadow-md hover:shadow-lg transition"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* RIGHT: CAROUSEL */}
        <div className="w-full lg:w-[450px]">
          <Carousel setApi={setCarouselApi} className="w-full">
            <CarouselContent>
              {images.map((src, i) => (
                <CarouselItem key={i}>
                  <div className="w-full h-[300px] md:h-[350px] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={src}
                      loading="lazy"
                      alt={`slide-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-[-1.6rem]" />
            <CarouselNext className="right-[-1.6rem]" />
          </Carousel>
        </div>
      </section>

      {/* ========================= FEATURES SECTION ========================= */}
      <section
        id="features"
        className="px-8 md:px-16 py-20 bg-gray-50 dark:bg-gray-800 transition-colors"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything You Need for Efficient HR Management
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          A complete set of tools designed to help HR teams stay organized and
          employees stay productive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="h-6 w-6 text-primary" />}
            title="User Management"
            desc="Track employee attendance, history, and work hours."
          />
          <FeatureCard
            icon={<UserPlus className="h-6 w-6 text-primary" />}
            title="Employee Registration"
            desc="Add new employees quickly with integrated validation."
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="Attendance Tracking"
            desc="Clock-in/out tracking with automatic hour calculation."
          />
          <FeatureCard
            icon={<CalendarCheck className="h-6 w-6 text-primary" />}
            title="Leave Management"
            desc="Submit leave requests and get fast approvals."
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6 text-primary" />}
            title="Salary Slip Automation"
            desc="Generate accurate salary slips in one click."
          />
          <FeatureCard
            icon={<Star className="h-6 w-6 text-primary" />}
            title="Performance Review"
            desc="Evaluate and record employee performance securely."
          />
        </div>
      </section>
    </div>
  );
}

/* ========================= FEATURE CARD COMPONENT ========================= */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition duration-200">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
