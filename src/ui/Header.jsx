import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  ShoppingCartIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUserFromLocal } from "../features/auth/userSlice";
import { removeCart } from "../features/cart/cartSlice";

const userMenuItems = [
  {
    label: "Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Carts",
    icon: ShoppingCartIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
const adminMenuItems = [
  {
    label: "Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Product",
    icon: ListBulletIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu({ user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = user.role === "admin" ? adminMenuItems : userMenuItems;
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {menuItems.map(({ label, icon }, key) => {
          const isLastItem = key === menuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {

                switch (label) {
                  case "Sign Out":
                    dispatch(removeUserFromLocal());
                    dispatch(removeCart());
                    break;
                  case "Product":
                    nav("/admin-product");
                    break;
                  case "Carts":
                    nav("/cart-page");
                    break;
                  case "Profile":
                    nav("/user-profile");
                    break;

                }
                closeMenu()
              }}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}


const Header = () => {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice)

  return (
    <Navbar fullWidth className=" p-2  flex items-center justify-between text-blue-gray-900">


      <Typography
        as="a"
        href="#"
        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        onClick={() => nav('/')}
        color="deep-orange"
      >
        E-commerce Mini Platform
      </Typography>



      {user ? <ProfileMenu user={user} /> : <Button
        onClick={() => nav('/login')}
        size="sm" variant="text">
        <span>Log In</span>
      </Button>}




    </Navbar>
  );
}

export default Header