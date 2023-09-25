"use client"
import React from 'react'
import SingleReview from '../singleReview/SingleReview'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Reviews = () => {
const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    event.preventDefault()
    setAge(event.target.value);
    //hit api request
  };
  return (
    <div>
        <div className="ml-[15px] mt-[120px]  text-[30px]">Product Reviews</div>
        <Box sx={{  width: '200px',mt:'15px',ml:'15px' }}>
      <FormControl fullWidth sx={{
        
      }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="sorting"
          id="sorting"
          value={age}
          label="Age"
          
          onChange={handleChange}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={10}>Newest</MenuItem>
          <MenuItem value={20}>High Rated</MenuItem>
          <MenuItem value={30}>Poor Rated</MenuItem>

        </Select>
      </FormControl>
    </Box>
        <SingleReview />
        <SingleReview />
        <SingleReview />
    </div>
  )
}

export default Reviews