import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    // Fetch from backend suman
    {
      qty: 5,
      product: "Oranges",
      img: "https://img.freepik.com/free-psd/orange-fruit-isolated-transparent-background_191095-14952.jpg?size=338&ext=jpg&ga=GA1.1.34264412.1715644800&semt=sph",
      customer: "Sumit Khadka",
      date: "1 May",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      qty: 2,
      product: "Milk",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZ1wr_xPeTzwgwQc3o4dNoHaI_pV00JNFiLS26QTAuQ&s",
      customer: "Janak Khale",
      date: "10 May",
      amount: 280,
      method: "Esewa",
      status: "Pending",
    },
    {
      qty: 5,
      product: "Tomatoes",
      img: "https://t4.ftcdn.net/jpg/03/27/96/23/240_F_327962332_6mb5jQLnTOjhYeXML7v45Hc5eED2GYOD.jpg",
      customer: "Roman Maharjan",
      date: "7 May",
      amount: 600,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      qty: 2,
      product: "Frozen Momo",
      img: "https://5.imimg.com/data5/SELLER/Default/2023/12/365752403/HG/AZ/TU/51157866/veg-momos-250x250.jpg",
      customer: "Suman Shrestha",
      date: "6 May",
      amount: 920,
      method: "Visa Card",
      status: "Approved",
    },
    {
      qty: 5,
      product: "Onions",
      img: "https://www.freshpoint.com/wp-content/uploads/commodity-red-onion.jpg",
      customer: "Abhishek Khatri",
      date: "5 May",
      amount: 1000,
      method: "Esewa",
      status: "Approved",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Quantity (kg/ltr)</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount (Rs.)</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.qty}>
              <TableCell className="tableCell">{row.qty}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;