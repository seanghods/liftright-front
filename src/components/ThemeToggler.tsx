import { Dropdown, Menu, useTheme } from "react-daisyui";
import { Airplay, Moon, Sun } from "lucide-react";
import React from "react";

export const ThemeToggler: React.FC = () => {
  const { setTheme } = useTheme();

  return (
    <div className="fixed bottom-5 end-5 z-10 flex flex-col items-center">
      <Dropdown className="dropdown-end dropdown-top">
        <Dropdown.Toggle>
          Theme
          <svg
            className="inline-block h-2 w-2 rotate-180 fill-current opacity-60"
            height="12px"
            viewBox="0 0 2048 2048"
            width="12px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-52">
          <Menu size={"xs"}>
            <Menu.Item onClick={() => setTheme("system")}>
              <div className="flex gap-3 text-sm">
                <Airplay className="h-5" />
                System
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme("light")}>
              <div className="flex gap-3 text-sm">
                <Sun className="h-5" />
                Light
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme("dark")}>
              <div className="flex gap-3 text-sm">
                <Moon className="h-5" />
                Dark
              </div>
            </Menu.Item>
          </Menu>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
