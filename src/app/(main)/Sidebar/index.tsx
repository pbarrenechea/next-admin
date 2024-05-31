import { Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <>
      {isMobileOpen && (
        <div className="lg:hidden overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[59] w-full h-full"></div>
      )}

      <div className="h-full fixed top-0 z-[60]">
        <div className="flex flex-no-wrap h-full ">
          <div
            style={{ minHeight: '716px' }}
            className="w-64 absolute lg:relative bg-white shadow lg:h-full flex-col justify-between hidden lg:flex"
          >
            <div className="px-8">
              <div className="overflow-hidden rounded-full inline-flex mt-4">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABBBJREFUaEPtV2tsS2EYfnpZ11l3083QsZmJkLjEjLgHwSR+kI25xjVMJEIwIsESTMTEnYi7BDGGRMw1IeL2Z0ZEYj/Yaus2lrMVK9qtrbxftdrqTk8Ph4Xz/uo553svz/s83/t9VTTeKHXiHzCFDKSNsSgz0sYIgcyIzIhEHZClJVFjRYeVGRHdOokc/y9GHJ+taDFbWC/V+igow8N4+2r/YIHdYoVCrUJYhxhBa1ns9lFQavljtxZMECPmm2XgLjxkMXSDeiBx8QTe4t4fv4NPj15BHadD8o55vGurN5+H1VjP1sROTIc+a4go8YUMhLJ0XDoRkendW00oFIitmkNV/jlPHKVWg5RdC6EIU4UMRhQQSth12xyooiICJhQKhDv/AObbz3xiENvEeqgmCgiTWEYaEpdkigbibLajcuUxOL7a0H7yYHx6XI7md2Zo0zrBsC4rVBzCLo3ee4R039LYxBIlLs2ELj3tp6RuRogxkkogs5S+Rt2h6+yTYf1UfC03gSt+xJ675M+AJkkfEpiQGTGszYJpezFL0prEhACp3XMVn18YWYyUvYtgb2iCcd1pFjdmTF/EzxwpLZBu+xbj470X4Iofs0S6gWlIzPWVWDAgLVR03knXpMocAH32UPa7pvAKvryqZr+77V8S0igOmRECoghXw1RwEdbK9y6J5WYyQG4LBqSxpBQNl1yN8JZR05NyvDt6m71PmDsG0SN6C2ZFFBBlhAY2E4eqTa7RySRWMBuq6HbsmReI0wlj3im2z8KTE5C0IcdTrMPajIplh9mzJikeXfKnSw+EMpivP/VsUDpX6HwJBuRLuQk1Oy6zdfGzRiFmdB+fYutP38XH+y/ZO8P6bGhTOwoCI5oRiu50OHwl9v0M4GPE/Y382/VNgTo20qdQ69t6j2SjhvVCh/ljpQdCGWw1DajaePaHxLbOZizRFcV//NKdrWL5EUGFuRel7F4ElU4b1OeXGHFHN994Cu6i6wyIHJDK9kwgICQZkg4ZHahqfXTAAmn/0Whm8ssZgZhx/f4MEH+JubP6M1K9pcgjm9SDuVBo1AELpJu2cfUJ9i0sIRpdC+YACgUvmN/CiL/EAgHxnnI0Vmm88lndvmuwPK9gSzqvmoyIXkl/Bghl8ZYYPXszwhU9hPlWmauwNVMQ0dPAW5il7A3qDpS4ZBjg0PV3/m2MUGB/ibmBOFvsqFzhuiCydzsXAEp+qXj7UOzkwvk/TThvMMKA3HoGrugB8wt2dbDVNqJqwxm21v3HijYu3a3I4iZlsNuuEKMBQiyT6acNR+z4/q26CQIiJOnfXiMD+dsMiNrsba3oQPXI0mprLMmMyIxI1AFZWhI1VnRYmRHRrZPIUWZEosaKDiszIrp1Ejn+M4x8A43Gl8ewvzA7AAAAAElFTkSuQmCC" />
              </div>
              <ul className="mt-12">
                <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                  <Link
                    href="/users"
                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-white text-info-600"
                  >
                    <User />
                    <span className="text-sm ml-2">Users</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <button
            aria-label="toggle sidebar"
            id="openSideBar"
            className={`${isMobileOpen ? 'hidden' : ''} lg:hidden h-10 w-10 border-0 absolute right-0 mt-2 left-2 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800`}
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu />
          </button>
          <div
            className={`${isMobileOpen ? '' : 'hidden'} w-64 relative bg-white shadow h-full flex-col justify-between lg:hidden transition duration-150 ease-in-out`}
            id="mobile-nav"
          >
            <button
              aria-label="Close sidebar"
              id="closeSideBar"
              className={`${isMobileOpen ? '' : 'hidden'} h-10 w-10 absolute top-4 right-[20px] items-center rounded-tr rounded-br justify-center cursor-pointer text-slate-900`}
              onClick={() => setIsMobileOpen(false)}
            >
              <X />
            </button>
            <div className="px-8">
              <div className="overflow-hidden rounded-full inline-flex mt-4">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABBBJREFUaEPtV2tsS2EYfnpZ11l3083QsZmJkLjEjLgHwSR+kI25xjVMJEIwIsESTMTEnYi7BDGGRMw1IeL2Z0ZEYj/Yaus2lrMVK9qtrbxftdrqTk8Ph4Xz/uo553svz/s83/t9VTTeKHXiHzCFDKSNsSgz0sYIgcyIzIhEHZClJVFjRYeVGRHdOokc/y9GHJ+taDFbWC/V+igow8N4+2r/YIHdYoVCrUJYhxhBa1ns9lFQavljtxZMECPmm2XgLjxkMXSDeiBx8QTe4t4fv4NPj15BHadD8o55vGurN5+H1VjP1sROTIc+a4go8YUMhLJ0XDoRkendW00oFIitmkNV/jlPHKVWg5RdC6EIU4UMRhQQSth12xyooiICJhQKhDv/AObbz3xiENvEeqgmCgiTWEYaEpdkigbibLajcuUxOL7a0H7yYHx6XI7md2Zo0zrBsC4rVBzCLo3ee4R039LYxBIlLs2ELj3tp6RuRogxkkogs5S+Rt2h6+yTYf1UfC03gSt+xJ675M+AJkkfEpiQGTGszYJpezFL0prEhACp3XMVn18YWYyUvYtgb2iCcd1pFjdmTF/EzxwpLZBu+xbj470X4Iofs0S6gWlIzPWVWDAgLVR03knXpMocAH32UPa7pvAKvryqZr+77V8S0igOmRECoghXw1RwEdbK9y6J5WYyQG4LBqSxpBQNl1yN8JZR05NyvDt6m71PmDsG0SN6C2ZFFBBlhAY2E4eqTa7RySRWMBuq6HbsmReI0wlj3im2z8KTE5C0IcdTrMPajIplh9mzJikeXfKnSw+EMpivP/VsUDpX6HwJBuRLuQk1Oy6zdfGzRiFmdB+fYutP38XH+y/ZO8P6bGhTOwoCI5oRiu50OHwl9v0M4GPE/Y382/VNgTo20qdQ69t6j2SjhvVCh/ljpQdCGWw1DajaePaHxLbOZizRFcV//NKdrWL5EUGFuRel7F4ElU4b1OeXGHFHN994Cu6i6wyIHJDK9kwgICQZkg4ZHahqfXTAAmn/0Whm8ssZgZhx/f4MEH+JubP6M1K9pcgjm9SDuVBo1AELpJu2cfUJ9i0sIRpdC+YACgUvmN/CiL/EAgHxnnI0Vmm88lndvmuwPK9gSzqvmoyIXkl/Bghl8ZYYPXszwhU9hPlWmauwNVMQ0dPAW5il7A3qDpS4ZBjg0PV3/m2MUGB/ibmBOFvsqFzhuiCydzsXAEp+qXj7UOzkwvk/TThvMMKA3HoGrugB8wt2dbDVNqJqwxm21v3HijYu3a3I4iZlsNuuEKMBQiyT6acNR+z4/q26CQIiJOnfXiMD+dsMiNrsba3oQPXI0mprLMmMyIxI1AFZWhI1VnRYmRHRrZPIUWZEosaKDiszIrp1Ejn+M4x8A43Gl8ewvzA7AAAAAElFTkSuQmCC" />
              </div>
              <ul className="mt-12">
                <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                  <Link href="/users" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                    <User />
                    <span className="text-sm ml-2">Users</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Sidebar ends */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
