import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/396059466_1057678432317800_1566569574315840947_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Y92_JgI7PPYQ7kNvgEMgrZq&_nc_ht=scontent.fktm3-1.fna&oh=00_AYD4FX11vO65mSHCLhDgSSL_lk9TeRMRmdOZgiCTOYZyvw&oe=6647CAB0"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;