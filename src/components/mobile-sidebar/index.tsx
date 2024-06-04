import SidebarContent from "@/components/sidebar-content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";

const Sidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <MdOutlineMenu className="text-2xl text-black md:text-3xl" />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-[#13101c]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
