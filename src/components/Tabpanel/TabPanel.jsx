"use client"
import React, { Fragment, useState } from "react";
import { Box, Tab, Tabs,  useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import AddProduct from "../AddProduct/AddProduct";
import SaleChart from "../chart/SaleChart";
import OrderList from "../Order/OrderList";
import ProfileEdit from "../ProfileEdit.jsx/ProfileEdit";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="w-[100%]  flex justify-center "
    >
      {value === index && (
        <Box sx={{ width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', }}>
          <Box sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',p:1}}>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TabPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };
  const isNonMobileScreens = useMediaQuery("(min-width:900px)")

  return (
    <Fragment>
      <Box sx={{ width: "100%",mt:'20px' ,bgcolor:"" ,display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
        <Box sx={{ borderBottom: 1, borderColor: "divider" ,width:"100%", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
            }}
          >
            <Tab
              
              sx={{color:"black",textTransform:'capitalize' }}
              label="Edit Profile"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ color:"black",textTransform:'capitalize' }}
              label="Add Product"
              {...a11yProps(1)}
            />
             <Tab 
            label="Sales" 
            {...a11yProps(2)} 
            sx={{ color:"black",textTransform:'capitalize' }}
            />  
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        <ProfileEdit />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AddProduct/>
        </CustomTabPanel>
       <CustomTabPanel value={value} index={2}>
        
        <SaleChart />
      </CustomTabPanel>  
      </Box>
    </Fragment>
  );
};

export default TabPanel;
