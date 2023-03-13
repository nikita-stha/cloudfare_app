import "./Table.css";

const Table = ({ data, column, title }) => {
    return (
      <div>
        <h2>{title}</h2>
        <table>
            <thead>
            <tr>
                {column.map((item, index) => <TableHeadItem item={item} />)}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => <TableRow item={item} column={column} />)}
            </tbody>
        </table>
    </div>
    )
  }
  
const TableHeadItem = ({ item }) => <th>{item.Header}</th>
const TableRow = ({ item, column }) => (
<tr>
    {column.map((columnItem, index) => {
    return <td>{item[`${columnItem.accessor}`]}</td>
    })}
</tr>
)

export default Table;
