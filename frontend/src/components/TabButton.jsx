import { NavLink } from "react-router-dom";

function TabButton({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        (isActive
          ? "dark:text-neutral-950 text-neutral-50 bg-neutral-950 dark:bg-neutral-50"
          : isPending
          ? "opacity:70"
          : "text-neutral-950 dark:text-neutral-50 hover:text-white dark:hover:text-black hover:bg-neutral-950 dark:hover:bg-neutral-50") +
        " rounded-md p-2 hover:cursor-pointer font-medium transition-colors"
      }
    >
      {children}
    </NavLink>
  );
}

export default TabButton;
