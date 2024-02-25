import { useEffect, useState } from "react";
import SimpleButton from "./SimpleButton";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function ThemeSwitcher() {
  const isSystemThemeDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(isSystemThemeDark() ? "dark" : "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <SimpleButton
      onClick={() => {
        theme == "dark" ? setTheme("light") : setTheme("dark");
      }}
    >
      {theme == "dark" && <MoonIcon className="w-3 h-3 lg:w-4 lg:h-4" />}
      {theme == "light" && <SunIcon className="w-3 h-3 lg:w-4 lg:h-4" />}
    </SimpleButton>
  );
}

export default ThemeSwitcher;
