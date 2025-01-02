import React from "react";

const TableUser = () => {
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-gray-300 shadow-md rounded-lg bg-clip-border">
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto min-w-max text-slate-800">
          <thead>
            <tr className="text-slate-500 border-b border-slate-30 bg-gray-300">
              <th className="p-4">
                <span className="text-sm leading-none font-normal">
                  Project Name
                </span>
              </th>
              <th className="p-4">
                <span className="text-sm leading-none font-normal">
                  Start Date
                </span>
              </th>
              <th className="p-4">
                <span className="text-sm leading-none font-normal">
                  End Date
                </span>
              </th>
              <th className="p-4">
                <span className="text-sm leading-none font-normal">Owner</span>
              </th>
              <th className="p-4">
                <span className="text-sm leading-none font-normal">Budget</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Rows */}
            {[
              {
                name: "Project Alpha",
                startDate: "01/01/2024",
                endDate: "30/06/2024",
                owner: "John Michael",
                budget: "$50,000",
              },
              {
                name: "Beta Campaign",
                startDate: "15/02/2024",
                endDate: "15/08/2024",
                owner: "Alexa Liras",
                budget: "$75,000",
              },
              {
                name: "Campaign Delta",
                startDate: "01/03/2024",
                endDate: "01/09/2024",
                owner: "Laurent Perrier",
                budget: "$60,000",
              },
              {
                name: "Gamma Outreach",
                startDate: "10/04/2024",
                endDate: "10/10/2024",
                owner: "Michael Levi",
                budget: "$80,000",
              },
              {
                name: "Omega Strategy",
                startDate: "01/05/2024",
                endDate: "01/11/2024",
                owner: "Richard Gran",
                budget: "$100,000",
              },
            ].map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="p-4">
                  <p className="text-sm font-bold">{row.name}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm">{row.startDate}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm">{row.endDate}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm">{row.owner}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm">{row.budget}</p>
                </td>
                <td className="p-4">
                  <a href="#" className="text-sm font-semibold">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUser;
