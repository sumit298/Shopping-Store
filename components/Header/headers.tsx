"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block text-xl font-bold">
              {siteConfig.name}
            </span>
          </Link>
        </div>
        <form className="hidden items-center lg:inline-flex">
          <input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
          />
        </form>
        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <button>
              {/* <ShoppingBag className="h-5 w-5" /> */}
              <span className="ml-2 text-sm font-bold">0</span>
              <span className="sr-only">Cart</span>
            </button>
          </Link>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
