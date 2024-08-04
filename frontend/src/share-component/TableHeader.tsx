import React from 'react';

interface TableHeaderProps {
    headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
    return (
        <tr>
            {headers.map((header, index) => (
                <th key={index} scope="col">
                    {header}
                </th>
            ))}
        </tr>
    );
};

export default TableHeader;
