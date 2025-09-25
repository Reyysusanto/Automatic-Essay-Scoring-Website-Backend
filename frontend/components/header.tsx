import { Search } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
  return (
    <div className="pl-6 bg-white py-4 px-6 flex justify-between items-center">
      <div className="relative">
        <Search className="w-5 h-5 absolute inset-y-0 left-3 top-2 text-gray-400" />
        <Input
          placeholder="Search"
          className="rounded-full bg-slate-100 border-gray-300 pr-4 pl-10 text-gray-400 w-[260px] lg:w-[340px]"
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-sm font-medium">Vinca Rosea</h3>
        <p className="text-xs">Dosen Sistem Informasi</p>
      </div>
    </div>
  );
};

export default Header;
