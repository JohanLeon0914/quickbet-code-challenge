import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  return (
    <header className="fixed w-full z-20 top-0 flex items-center justify-between p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900">
      <Link
        href="/"
        className="mr-10 flex items-center space-x-2 font-semibold text-white hover:text-yellow-400 transition-colors duration-300"
      >
        <span className="font-extrabold text-gradient bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text xl:text-4xl">
          QUICKBET
        </span>
      </Link>

      <div className="flex space-x-2">
        <ProfileDropdown />

        <GenreDropdown />

        <SearchInput />
      </div>
    </header>
  );
}

export default Header;
