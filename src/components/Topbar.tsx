import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Menu as MenuIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/UserContext";
import { API_ROUTES } from "@/utils/constants";
import posthog from "posthog-js";

export const Topbar: React.FC = () => {
  const { user, setUser } = useUser();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const navigate = useNavigate();
  async function handleLogOut() {
    const response = await fetch(API_ROUTES.logOut, {
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok && data.success) {
      posthog.reset();
      setUser(null);
      navigate("/");
    } else {
      console.log(data.message);
    }
  }

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
                        <Link
                          to={user ? "/all-responses" : "/"}
                          className="text-xl font-bold"
                        >
                          LiftRight
                        </Link>
                      </Menu.Item>
                      {user ? (
                        <>
                          <Menu.Item className="font-medium">
                            <Link to="/upload">Upload</Link>
                          </Menu.Item>
                          <Menu.Item className="font-medium">
                            <Link to="/all-responses">Responses</Link>
                          </Menu.Item>
                          <Menu.Item className="font-medium">
                            <Link to="/profile">Profile</Link>
                          </Menu.Item>
                          <Menu.Item className="font-medium">
                            <Link to="/">Landing</Link>
                          </Menu.Item>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
              <Link
                to={user ? "/all-responses" : "/"}
                className="text-xl font-bold"
              >
                LiftRight
              </Link>
            </Navbar.Start>

            <Navbar.Center className="hidden lg:flex">
              <Menu horizontal size="sm" className="gap-2 px-1">
                {user ? (
                  <>
                    <Menu.Item className="font-medium">
                      <Link to="/upload">Upload</Link>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <Link to="/all-responses">Responses</Link>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item className="font-medium">
                      <Link to="/">Landing</Link>
                    </Menu.Item>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Menu>
            </Navbar.Center>

            <Navbar.End className="gap-3">
              {user ? (
                <Button onClick={() => handleLogOut()} size="sm" color="ghost">
                  Log Out
                </Button>
              ) : (
                <>
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
                </>
              )}
            </Navbar.End>
          </Navbar>
        </div>
      </div>
    </>
  );
};
