import { useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, MoveRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Homepage = () => {
  const { theme } = useTheme();

  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <section>
        <nav className="w-full fixed top-0 z-50 p-4 bg-white dark:bg-black border-b backdrop-blur-md bg-clip-padding backdrop-filter bg-opacity-80 dark:bg-opacity-50 border border-gray-100 dark:border-black">
          <div className="container w-[90%] md:w-[60%] mx-auto flex items-center relative">
            <div className="logo">
              <img
                src={
                  theme === "light"
                    ? "/logo-light-mode.png"
                    : "/logo-dark-mode.png"
                }
                alt="zettel"
                className="h-10 w-full object-cover"
              />
            </div>
            <div className="block md:hidden ml-auto">
              <Menu
                className="cursor-pointer"
                onClick={() => setNavOpen(!navOpen)}
              />
              {navOpen && (
                <div className="nav-menu p-6 fixed top-[100%] left-0 w-full bg-white dark:bg-black border-b border-gray-300 dark:border-black">
                  <ul className="list-none">
                    <li className="my-4">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="my-4">
                      <a
                        href="https://github.com/shaan-alam/zettel"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    </li>
                    <li className="my-4">
                      <Link href="/app/auth">Log in</Link>
                    </li>
                    <li>
                      <ModeToggle />
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="hidden md:block menu w-full">
              <ul className="flex items-center justify-end list-none">
                <li className="mr-4">
                  <Link href="/">Home</Link>
                </li>
                <li className="mr-4">
                  <a
                    href="https://github.com/shaan-alam/zettel"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li className="mr-4">
                  <Link href="/app/auth">
                    <Button variant="outline">Log in</Button>
                  </Link>
                </li>
                <li>
                  <ModeToggle />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="hero text-center pt-12 relative">
          <h1 className="text-black text-8xl font-bold mt-12">
            <img
              src={
                theme === "light"
                  ? "/logo-light-mode.png"
                  : "/logo-dark-mode.png"
              }
              className="mx-auto"
            />
          </h1>
          <p className="text-xl text-center text-gray-500 dark:text-gray-200 mt-4">
            A web-based Markdown note-taking App
            <br /> for developers by Shaan Alam 🔥
          </p>
          <Link href="/app/auth">
            <Button className="mt-6">
              Get Started&nbsp; <MoveRight />
            </Button>
          </Link>
          <div className="absolute h-[50px] sm:h-[200px] w-[400px] sm:w-[600px] bg-blue-400 left-1/2 -translate-x-1/2 blur-3xl -z-10 opacity-40 dark:opacity-70 animate-pulse bg-tint"></div>
          <img
            src={theme === "light" ? "/demo-light.png" : "/demo-dark.png"}
            alt="Zettel Demo"
            className="mx-auto mt-4"
          />
        </div>
      </section>
      <section className="features bg-black dark:bg-white p-12">
        <h1 className="text-5xl text-white dark:text-black text-center font-bold">
          Features
        </h1>
        <div className="md:grid grid-cols-2 gap-8 mt-12">
          <div className="features-text md:ml-28 mt-8">
            <ul className="text-gray-300 dark:text-gray-500">
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Markdown Notes:
                </span>
                &nbsp; Take notes easily using markdown format.
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Markdown Preview:
                </span>
                &nbsp; Easily preview your markdown in HTML.
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Images:
                </span>
                &nbsp; Supports image uploading.
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Collections:
                </span>
                &nbsp; Categorize your notes in separate collections
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Collections Color Coding:
                </span>
                &nbsp; Visualize your collections with a color code for each.
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Beautiful UI:
                </span>
                &nbsp; Work in aesthetically pleasing environment
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Dark Mode:
                </span>
                &nbsp; We&apos;ve got Dark mode too! 🌙
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Syntax Highlighting:
                </span>
                &nbsp; Get beautiful syntax highlighting for your code blocks!
              </li>
              <li className="my-4">
                <span className="font-bold text-white dark:text-black">
                  Open source:
                </span>
                &nbsp; The code is publically available on GitHub
              </li>
            </ul>
          </div>
          <div className="features-img">
            <img src="/features.png" alt="Zettel Demo" className="w-full" />
          </div>
        </div>
      </section>
      <section className="meet-the-creator p-12">
        <div className="w-[90%] md:w-[60%] mx-auto md:grid grid-cols-2 mt-12">
          <div className="creator-img">
            <img src="/shaan.png" alt="Shaan Alam" />
          </div>
          <div className="creator-intro text-gray-500 dark:text-gray-300 md:-ml-12">
            <h1 className="mt-4 md:mt-0 text-3xl md:text-5xl text-black dark:text-white font-bold mb-8">
              Meet the Creator
            </h1>
            <p className="leading-7">
              Hi👋 I&apos;m Shaan Alam. I am the creator of Zettel. I created
              Zettel because I am an avid note-taker and I keep using Notion for
              that. I thought why not create a note taking app of my own?. And I
              started zettel as a personal side project.
            </p>
            <p className="leading-7 mt-4">
              If you want to contact me for some future project, feel free to
              email me at&nbsp;
              <span className="text-black dark:text-white font-bold">
                shaanalam718@gmail.com
              </span>
            </p>
          </div>
        </div>
      </section>
      <footer className="p-12 border-t">
        <div className="w-[90%] md:w-[60%] mx-auto">
          <div className="md:grid grid-cols-2 gap-8">
            <img
              src={
                theme === "light"
                  ? "/logo-light-mode.png"
                  : "/logo-dark-mode.png"
              }
              alt="zettel"
              className="h-10 object-cover"
            />
            <div className="menu mt-6 md:mt-0 ml-auto grid grid-cols-2 gap-4">
              <div className="menu-1">
                <h1 className="text-black dark:text-white font-bold">
                  Project
                </h1>
                <ul className="list-none mt-6">
                  <li className="mr-4 text-muted-foreground hover:text-black dark:hover:text-white my-2">
                    <a
                      href="https://github.com/shaan-alam/zettel"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <div className="menu-2">
                <h1 className="text-black dark:text-white font-bold">
                  Shaan Alam
                </h1>
                <ul className="list-none mt-6">
                  <li className="mr-4 text-muted-foreground hover:text-black dark:hover:text-white my-2">
                    <a
                      href="https://github.com/shaan-alam"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li className="mr-4 text-muted-foreground hover:text-black dark:hover:text-white my-2">
                    <a
                      href="https://twitter.com/shaancodes"
                      target="_blank"
                      rel="noreferrer"
                    >
                      X
                    </a>
                  </li>
                  <li className="mr-4 text-muted-foreground hover:text-black dark:hover:text-white my-2">
                    <a
                      href="https://instagram.com/shaancodes"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Homepage;

{
  /* <ul className="list-none flex items-center">
                <li className="mr-4 text-muted-foreground hover:text-black my-2">
                  <a href="#!">GitHub</a>
                </li>
                <li className="mr-4 text-muted-foreground hover:text-black my-2">
                  <a href="#!">Shaan Alam</a>
                </li>
              </ul> */
}
