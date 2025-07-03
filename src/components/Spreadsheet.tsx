import {
  useTable,
  useSortBy,
  type Column,
  type Row,
  type HeaderGroup,
  type Cell,
  type UseSortByColumnProps,
  type ColumnInstance,
} from "react-table";
import { useMemo, useState, useRef } from "react";

type DataType = {
  name: string;
  email: string;
  status: "Active" | "Inactive";
};

const defaultData: DataType[] = [
  { name: "John Doe", email: "john@example.com", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  { name: "Bob Ray", email: "bob@example.com", status: "Active" },
];

const Spreadsheet = () => {
  const [data, setData] = useState<DataType[]>(defaultData);
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [selected, setSelected] = useState<{ row: number; col: string }>({
    row: 0,
    col: "name",
  });
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    name: 200,
    email: 250,
    status: 150,
  });

  const resizeCol = useRef<string | null>(null);

  const filteredData = useMemo(() => {
    if (filter === "All") return data;
    return data.filter((row) => row.status === filter);
  }, [filter, data]);

  const columns: Column<DataType>[] = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<DataType>({ columns, data: filteredData }, useSortBy);

  const handleMouseDown = (colId: string) => {
    resizeCol.current = colId;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizeCol.current) return;
    setColumnWidths((prev) => ({
      ...prev,
      [resizeCol.current!]: Math.max(60, e.clientX - 100),
    }));
  };

  const handleMouseUp = () => {
    resizeCol.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleCellChange = (
    rowIndex: number,
    columnId: keyof DataType,
    value: string
  ) => {
    const updated = [...data];
    const realIndex = data.indexOf(filteredData[rowIndex]);
    updated[realIndex] = { ...updated[realIndex], [columnId]: value as any };
    setData(updated);
  };

  const handleAddRow = () => {
    setData((prev) => [
      ...prev,
      { name: "", email: "", status: "Active" },
    ]);
  };

  return (
    <div className="space-y-4 font-sans text-sm">
      {/* Tabs */}
      <div className="flex gap-2">
        {["All", "Active", "Inactive"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as "All" | "Active" | "Inactive")}
            className={`px-3 py-1 rounded-sm border text-sm ${
              filter === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-blue-100`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white border rounded-sm px-3 py-2 shadow-sm">
        <button
          onClick={handleAddRow}
          className="bg-blue-600 text-white px-3 py-1 text-sm rounded-sm hover:bg-blue-700"
        >
          + New Row
        </button>
        <span className="text-xs text-gray-500">Styled Spreadsheet</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-sm shadow-sm">
        <table
          {...getTableProps()}
          className="min-w-full border-collapse text-sm table-fixed"
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup: HeaderGroup<DataType>) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
  const col = column as unknown as ColumnInstance<DataType> & UseSortByColumnProps<DataType>;

  return (
    <th
      {...col.getHeaderProps(col.getSortByToggleProps())}
      key={col.id}
      style={{ width: columnWidths[col.id] ?? 200 }}
      className="border px-2 py-1 text-left relative group font-medium"
    >
      <div className="flex items-center justify-between">
        {col.render("Header")}
        <span>{col.isSorted ? (col.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
      </div>
      <div
        onMouseDown={() => handleMouseDown(col.id)}
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize group-hover:bg-blue-400"
      />
    </th>
  );
})}

              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row: Row<DataType>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell: Cell<DataType>) => {
                    const isSelected =
                      selected.row === row.index &&
                      selected.col === cell.column.id;

                    const colId = cell.column.id as keyof DataType;

                    return (
                      <td
                        {...cell.getCellProps()}
                        tabIndex={0}
                        onClick={() =>
                          setSelected({ row: row.index, col: cell.column.id })
                        }
                        onKeyDown={(e) => {
                          const headers = headerGroups[0].headers;
                          if (e.key === "ArrowDown") {
                            setSelected((prev) => ({
                              ...prev,
                              row: Math.min(prev.row + 1, rows.length - 1),
                            }));
                          } else if (e.key === "ArrowUp") {
                            setSelected((prev) => ({
                              ...prev,
                              row: Math.max(prev.row - 1, 0),
                            }));
                          } else if (e.key === "ArrowRight") {
                            const currentIndex = headers.findIndex(
                              (h) => h.id === selected.col
                            );
                            const next = Math.min(
                              currentIndex + 1,
                              headers.length - 1
                            );
                            setSelected({
                              row: selected.row,
                              col: headers[next].id,
                            });
                          } else if (e.key === "ArrowLeft") {
                            const currentIndex = headers.findIndex(
                              (h) => h.id === selected.col
                            );
                            const prevIndex = Math.max(currentIndex - 1, 0);
                            setSelected({
                              row: selected.row,
                              col: headers[prevIndex].id,
                            });
                          }
                        }}
                        className={`px-2 py-1 border outline-none truncate ${
                          isSelected
                            ? "bg-yellow-100 border-blue-500 ring-2 ring-blue-400"
                            : ""
                        }`}
                        style={{
                          width: columnWidths[cell.column.id] ?? 200,
                        }}
                      >
                        {colId === "status" ? (
                          <select
                            className="w-full bg-transparent outline-none"
                            value={cell.value}
                            onChange={(e) =>
                              handleCellChange(row.index, colId, e.target.value)
                            }
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        ) : (
                          <input
                            className="w-full bg-transparent outline-none"
                            value={(cell.value as string) ?? ""}
                            onChange={(e) =>
                              handleCellChange(row.index, colId, e.target.value)
                            }
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
