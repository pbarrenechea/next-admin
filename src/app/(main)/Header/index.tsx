import Profile from '@/app/(main)/Header/ProfileDropdown';

const Header = () => {
  return (
    <header className="sticky top-0 lg:ml-[240px] z-50">
      <div className="appHeader">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center md:space-x-4 space-x-2 "></div>
          <div className="nav-tools flex items-center lg:space-x-6 space-x-3">
            <div className="relative inline-block">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
