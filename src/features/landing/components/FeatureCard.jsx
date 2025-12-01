import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
export default function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="shadow-sm hover:shadow-xl transition hover:-translate-y-1 bg-white/5 dark:bg-neutral-900/30">
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