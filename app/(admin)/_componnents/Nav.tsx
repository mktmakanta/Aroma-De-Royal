import { Menu, X } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";

export default function Navbar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <button className="lg:hidden" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="hidden  md:flex text-lg font-bold">Welcome Back, Admin</h1>
      <div className="flex items-center  space-x-4">
        <Button variant="outline">Date</Button>
        <Button variant="outline">Export</Button>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </header>
  );
}
