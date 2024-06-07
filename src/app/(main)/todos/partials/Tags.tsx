const Tags = () => {
  return (
    <ul>
      <li
        className=" flex space-x-2
                      text-sm capitalize py-2 cursor-pointer
                       items-center rtl:space-x-reverse
                        font-medium text-slate-800 dark:text-slate-300
                        "
      >
        <span
          className="
                                bg-danger-500 ring-danger-500




                                ring-4

                  inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150 "
        ></span>
        <span className="transition duration-150">Team</span>
      </li>
      <li
        className=" flex space-x-2
                      text-sm capitalize py-2 cursor-pointer
                       items-center rtl:space-x-reverse
                        font-normal text-slate-600 dark:text-slate-300
                        "
      >
        <span
          className="

                                bg-success-500 ring-success-500



                                ring-0

                  inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150 "
        ></span>
        <span className="transition duration-150">low</span>
      </li>
      <li
        className=" flex space-x-2
                      text-sm capitalize py-2 cursor-pointer
                       items-center rtl:space-x-reverse
                        font-normal text-slate-600 dark:text-slate-300
                        "
      >
        <span
          className="


                                bg-warning-500 ring-warning-500


                                ring-0

                  inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150 "
        ></span>
        <span className="transition duration-150">medium</span>
      </li>
      <li
        className=" flex space-x-2
                      text-sm capitalize py-2 cursor-pointer
                       items-center rtl:space-x-reverse
                        font-normal text-slate-600 dark:text-slate-300
                        "
      >
        <span
          className="



                                bg-primary-500 ring-primary-500

                                ring-0

                  inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150 "
        ></span>
        <span className="transition duration-150">high</span>
      </li>
      <li
        className=" flex space-x-2
                      text-sm capitalize py-2 cursor-pointer
                       items-center rtl:space-x-reverse
                        font-normal text-slate-600 dark:text-slate-300
                        "
      >
        <span
          className="




                                bg-info-500 ring-info-500
                                ring-0

                  inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150 "
        ></span>
        <span className="transition duration-150">update</span>
      </li>
    </ul>
  );
};

export default Tags;
