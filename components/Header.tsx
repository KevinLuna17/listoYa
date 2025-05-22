import { MagnifyingGlassIcon, InformationCircleIcon } from "@heroicons/react/24/solid"

function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row md:justify-between items-center p-5 bg-gray-500/10 rounded-b-2xl">
          <a className="text-3xl font-medium text-white pb-10 md:pb-0">Listo Ya!</a>

            <div className="flex items-center space-x-5 flex-1 justify-end w-full">
            {/* Search Box */}
            <form className="flex items-center space-x-5 shadow-md bg-white rounded-md p-2 flex-1 md:flex-initial">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                <input type="text" placeholder="Search"
                className="flex-1 outline-none p-2" />
                <button type="submit" hidden>Search</button>
            </form>

            {/* Avatar SignIn */}
          <a className="text-white">Sign In</a>
          </div>
      </div>

      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center text-sm font-light pr-5 p-5 shadow-xl rounded-xl w-fit italic bg-white max-w-3xl text-gray-500">
          <InformationCircleIcon className="inline-block size-10 mr-1"/>
          Escribe todas tus tareas por hacer</p>
      </div>
    </header>

  )
}

export default Header