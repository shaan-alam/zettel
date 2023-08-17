import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import NextNProgress from "nextjs-progressbar";

const RootLayout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      const theme = localStorage.getItem("theme");
      setTheme(theme || "");
    }
  }, []);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextNProgress color={theme === "dark" ? "#fff" : "#000"} />
        {children}
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
