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

export default function LandingPage() {
  const images = ["/images/slide1.jpg", "/images/slide2.jpg", "/images/slide3.jpg"];
  const [carouselApi, setCarouselApi] = useState(null);

  // Auto-play carousel every 2.5s
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen w-full bg-white text-black">

      {/* ========================= HERO SECTION ========================= */}
      <section
        id="home"
        className="flex flex-col lg:flex-row justify-between items-center px-8 md:px-16 py-20 gap-12"
      >
        {/* LEFT CONTENT */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Empower Your Workforce with Smarter HR Management
          </h1>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Simplify employee administration with a modern HRIS platform that
            integrates attendance, payroll, and performance in one intuitive
            system.
          </p>

          <Link to="/login">
            <Button size="lg" className="px-8 py-6 text-lg">
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
                  <div className="w-full h-[300px] md:h-[350px] bg-gray-100 rounded-xl overflow-hidden shadow-md">
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
      <section id="features" className="px-8 md:px-16 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything You Need for Efficient HR Management
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Our HRIS provides all essential tools to help HR teams and employees stay
          productive, organized, and connected.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="User Management"
            desc="Track employee attendance, history, and work hours."
          />
          <FeatureCard
            title="Employee Registration"
            desc="Add new employees quickly with integrated validation."
          />
          <FeatureCard
            title="Attendance Tracking"
            desc="Clock-in/out tracking with automatic work-hour calculation."
          />
          <FeatureCard
            title="Leave Management"
            desc="Submit leave requests and get approvals efficiently."
          />
          <FeatureCard
            title="Salary Slip Automation"
            desc="Generate accurate salary slips in one click."
          />
          <FeatureCard
            title="Performance Review"
            desc="Evaluate employee performance and store feedback securely."
          />
        </div>
      </section>
    </div>
  );
}

/* ========================= FEATURE CARD COMPONENT ========================= */
function FeatureCard({ title, desc }) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
