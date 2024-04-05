import React, { useState, useEffect } from "react"
import Navbar from "../components/navbar"

const UserList = () => {
  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const pageSize = 10

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/all/users?page=${page}`,
        {
          method: "GET",
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Error fetching data")
      }

      const responseData = await response.json()
      const { results, count } = responseData
      setData(results)
      setTotalPages(Math.ceil(count / pageSize))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <Navbar />
      <div id="main screen" className="h-max pb-10 bg-slate-200">
        <div className="flex justify-center h-max py-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-11/12 w-full mt-5 ">
            <div className="flex ps-5 w-full items-center flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 py-8  bg-white dark:dark:bg-gray-800">
              <div className="flex w-full justify-center ">
                <div className="flex w-full justify-start">
                  <div className="flex justify-start">
                    <p className="font-bold text-xl dark:text-white">Users</p>
                  </div>
                </div>
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="ps-5 px-2 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-2 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-10 py-3"></th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-50" />
                      </div>
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {user.name}
                        </div>
                      </div>
                    </th>
                    <th></th>
                    <td className="px-6 py-4">{user.email}</td>
                    <th></th>
                    <td className="px-6 py-4">
                      <a
                        href="/#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        View Profile
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav
              className="flex items-center justify-end flex-column flex-wrap md:flex-row  px-2 py-5 bg-white dark:bg-gray-800"
              aria-label="Table navigation"
            >
              <ul className="pe-5 inline-flex  space-x-px rtl:space-x-reverse text-sm h-8">
                <li key="prev">
                  <button
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {currentPage > 1 && (
                  <li key="first">
                    <button
                      onClick={() => handlePageClick(1)}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      First
                    </button>
                  </li>
                )}
                <span className="px-5 py-1 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Page{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {totalPages}
                  </span>
                </span>
                {currentPage < totalPages && (
                  <li key="last">
                    <button
                      onClick={() => handlePageClick(totalPages)}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Last
                    </button>
                  </li>
                )}
                <li key="next">
                  <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserList
