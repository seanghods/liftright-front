import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Menu as MenuIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Topbar: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onWindowScroll = () => {
      setAtTop(window.pageYOffset < 30);
    };
    window.addEventListener("scroll", onWindowScroll);
    onWindowScroll();
  }, []);

  return (
    <>
      {/* <div className="bg-neutral py-1.5 text-center text-xs text-neutral-content md:text-sm">
        <span>
          First Time Discount: Code
          <span className="mx-1 font-semibold text-primary">XYZ</span>
          for a 50% discount 🚀
        </span>
      </div> */}

      <div
        id="navbar-wrapper"
        className={`sticky top-0 z-10 border-b bg-base-100 lg:bg-opacity-95 lg:backdrop-blur-sm ${
          atTop ? "border-transparent" : "border-base-content/10"
        }`}
      >
        <div className="container">
          <Navbar className="px-0">
            <Navbar.Start className="gap-2">
              <div className="flex-none lg:hidden">
                <Drawer
                  open={drawerOpened}
                  onClickOverlay={() => setDrawerOpened(!drawerOpened)}
                  side={
                    <Menu className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
                      <Menu.Item className="font-medium">
                        <a href="index.html" className="text-xl font-bold">
                          LiftRight
                        </a>
                      </Menu.Item>

                      <Menu.Item className="font-medium">
                        <a href="/#home">Home</a>
                      </Menu.Item>
                      <Menu.Item className="font-medium">
                        <a href="/#sample">Sample</a>
                      </Menu.Item>
                      <Menu.Item className="font-medium">
                        <a href="/#features">Features</a>
                      </Menu.Item>
                      <Menu.Item className="font-medium">
                        <a href="/#pricing">Pricing</a>
                      </Menu.Item>
                      <Menu.Item className="font-medium">
                        <a href="/#faq">FAQ</a>
                      </Menu.Item>
                      <Menu.Item className="font-medium">
                        <Link to="/upload">Upload</Link>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button
                    shape="square"
                    color="ghost"
                    onClick={() => setDrawerOpened(true)}
                  >
                    <MenuIcon className="inline-block text-xl" />
                  </Button>
                </Drawer>
              </div>

              <a
                href="/"
                className="text-gradient-light text-xl font-bold tracking-tighter"
              >
                LiftRight
              </a>
            </Navbar.Start>

            <Navbar.Center className="hidden lg:flex">
              <Menu horizontal size="sm" className="gap-2 px-1">
                <Menu.Item className="font-medium">
                  <a href="/#home">Home</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <a href="/#sample">Sample</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <a href="/#features">Features</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <a href="/#pricing">Pricing</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <a href="/#faq">FAQ</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <Link to="/upload">Upload</Link>
                </Menu.Item>
              </Menu>
            </Navbar.Center>

            <Navbar.End className="gap-3">
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button size="sm" color="ghost">
                  Register
                </Button>
              </Link>
              <Link to="/log-in" style={{ textDecoration: "none" }}>
                <Button size="sm" color="primary">
                  Login
                </Button>
              </Link>
            </Navbar.End>
          </Navbar>
        </div>
      </div>
    </>
  );
};
