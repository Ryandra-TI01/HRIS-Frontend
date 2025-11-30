import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  const images = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1512403754473-27835f7b9984?w=800&auto=format&fit=crop&q=60",
  ];

  const [carouselApi, setCarouselApi] = useState(null);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => carouselApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* ========================= HERO ========================= */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-20 gap-12">
        <div className="max-w-2xl">
          <span className="text-primary font-semibold text-sm tracking-wider">
            HRIS PLATFORM
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3">
            Smart & Modern{" "}
            <span className="text-primary">HR Management System</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg leading-relaxed">
            A complete platform engineered to streamline employee attendance,
            performance, leave management, and payroll — empowering your HR team
            to work faster and more accurately.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link to="/login">
              <Button size="lg" className="px-7 py-6 text-lg shadow-md">
                Get Started
              </Button>
            </Link>

            <a href="#features">
              <Button
                variant="outline"
                size="lg"
                className="px-7 py-6 hover:bg-primary hover:text-white transition"
              >
                Explore Features
              </Button>
            </a>
          </div>
        </div>

        <div className="w-full lg:w-[450px]">
          <Carousel setApi={setCarouselApi}>
            <CarouselContent>
              {images.map((src, i) => (
                <CarouselItem key={i}>
                  <div className="w-full h-[300px] md:h-[350px] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={src}
                      alt=""
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
        className="px-8 md:px-16 py-20 bg-gray-50 dark:bg-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Powerful Features For Modern HR Teams
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          A fully integrated toolset designed to simplify HR workflows, automate
          repetitive tasks, and improve operational efficiency across your
          organization.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="h-6 w-6 text-primary" />}
            title="User Management"
            desc="Manage employee roles, departments, access levels, and complete profile data in a centralized system."
          />
          <FeatureCard
            icon={<UserPlus className="h-6 w-6 text-primary" />}
            title="Employee "
            desc="Streamlined onboarding process with automated validation for quicker and more accurate employee registration."
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="Attendance Tracking"
            desc="Accurate attendance logging with automated daily, weekly, and monthly work-hour calculations."
          />
          <FeatureCard
            icon={<CalendarCheck className="h-6 w-6 text-primary" />}
            title="Leave Management"
            desc="Submit and approve leave requests with real-time tracking and notifications for HR and managers."
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6 text-primary" />}
            title="Payroll & Salary Slips"
            desc="Generate digital salary slips instantly with full breakdowns, and tax deductions."
          />
          <FeatureCard
            icon={<Star className="h-6 w-6 text-primary" />}
            title="Performance Review"
            desc="Structured performance evaluation with score metrics, analytics, and long-term employee progress tracking."
          />
        </div>
      </section>

      {/* ========================= WHY US ========================= */}
      <section className="px-8 md:px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Why Choose Our System?
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Our platform combines modern UI/UX, strong security, and smooth
          scalability—making it ideal for growing teams who value convenience
          and performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WhyCard
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
            title="Secure & Reliable"
            desc="Your HR data is protected with enterprise-grade encryption and secure authentication standards."
          />
          <WhyCard
            icon={<Sparkles className="w-8 h-8 text-primary" />}
            title="Modern & Intuitive UI"
            desc="Our clean interface ensures fast learning curves for HR staff, employees, and managers."
          />
          <WhyCard
            icon={<TrendingUp className="w-8 h-8 text-primary" />}
            title="Scalable Architecture"
            desc="Built to grow with your organization — suitable for small teams up to enterprise-level deployment."
          />
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="px-8 md:px-16 py-10 border-t dark:border-gray-700">
        <p className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} HRIS Platform — FWD GRUP 7. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="shadow-sm hover:shadow-xl transition hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center gap-3">
        {icon}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

function WhyCard({ icon, title, desc }) {
  return (
    <Card className="shadow-md border dark:border-gray-700 hover:shadow-xl transition">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
