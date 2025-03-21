"use client";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { JSX, useState, useMemo } from "react";
import { Menu as MenuIcon, Search as SearchIcon, Plus as PlusIcon } from "lucide-react";
import SidebarMenu from "./menu";
import Modal from "@/components/ui/modal";

interface DataTableProps<T extends { name: string }> {
    data: T[];
    columns: ColumnDef<T>[];
    actions?: (row: T) => JSX.Element;
    title: string;
    onReload: () => void;
    customColumn?: ColumnDef<T>;
}

export default function DataTable<T extends { name: string }>({ title, data, columns, actions, onReload, customColumn }: DataTableProps<T>) {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalData, setModalData] = useState({
        isOpen: false,
        title: "",
        fields: [],
        type: "",
    });
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const table = useReactTable({
        data: filteredData,
        columns: [
            ...columns,
            ...(customColumn ? [customColumn] : []),
            {
                id: "actions",
                header: "Hành động",
                cell: ({ row }) => (actions ? actions(row.original) : null),
            },
        ],
        getCoreRowModel: getCoreRowModel(),
    });

    const handleOpenModal = (type: string, title: any, fields: any) => {
        setModalData({ isOpen: true, title, fields, type });
    };

    const handleCloseModal = () => {
        setModalData((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="flex">
            <SidebarMenu isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} onOpenModal={handleOpenModal} />
            <div className={`transition-all duration-300 ${isMenuOpen ? "ml-70" : "ml-0"} p-4 flex-1 b`}>
                <div className="flex items-center justify-between my-4 border-b pb-4">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <div className="flex items-center space-x-4 ml-auto">
                        <div className="flex items-center border rounded-md p-2 bg-gray-100 w-96">
                            <SearchIcon className="text-gray-500 mr-2" size={20} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>


                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-4 py-2 text-left">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center p-4">
                                    Không tìm thấy dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {modalData.isOpen && (
                <Modal
                    title={modalData.title}
                    type={modalData.type} 
                    fields={modalData.fields}
                    isOpen={modalData.isOpen}
                    onClose={handleCloseModal}
                    onReload={onReload}
                />
            )}
        </div>

    );
}
