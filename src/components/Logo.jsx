import { useTheme } from "next-themes";

export default function Logo({ size = 300 }) {
  const { theme } = useTheme();

  const logoSrc =
    theme === "dark"
      ? "/logo-hris-dark.png"
      : "/logo-hris.png";

  return (
    <img
      src={logoSrc}
      alt="HRIS Sync Logo"
      style={{
        width: size,
        height: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}
