function Sidebar(props) {
  return (
    <div className="inset-y-0 w-72 -left-72 fixed md:left-0 bg-white shadow-md">
      <div className="flex items-center space-x-3  mb-4 py-4 px-3 ">
        <div className="text-gray-600">Kanban</div>
      </div>

      <div className="divide-y px-3 flex flex-col">
        <div className="pb-5">
          <div className="flex items-center space-x-2 rounded-md text-gray-600 px-2 py-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 transition">
            <div className=""></div>
            <div className="">Activity</div>
          </div>

          <div className="flex items-center space-x-2 rounded-md text-gray-600 px-2 py-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 transition">
            <div className=""></div>
            <div className="">My Tasks</div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex items-center space-x-2 rounded-md text-gray-600 px-2 py-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 transition">
            <div className=""></div>
            <div className="">Overview</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
