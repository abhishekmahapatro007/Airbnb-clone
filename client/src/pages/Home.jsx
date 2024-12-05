import { SearchRounded } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 50px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const SearchContainer = styled.div`
  border-radius: 33px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  align-items: center;
  max-width: 900px;
  gap: 20px;
  font-size: 14px;
  padding: 14px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const LocationWrapper = styled.div`
  margin-left: 20px;
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Title = styled.div`
  color: #000;
  font-weight: 500;
  width: fit-content;
`;

const Desc = styled.input`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 400;
  margin-top: 14px;
  font-size: 16px;
  border: none;
  outline: none;
`;

const CheckInWrapper = styled.div`
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const CheckOutWrapper = styled.div`
  margin-right: 20px;
  border-radius: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const SearchWrapper = styled.div`
  border-radius: 33px;
  display: flex;
  gap: 1px;
`;

const SearchButton = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 400;
  padding: 20px 22px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Home = () => {
  const [location,setLocation] = useState('')
  const [checkInDate,setCheckInDate] = useState('')
  const [checkOutDate,setCheckOutDate] = useState('')
  const navigate = useNavigate()

  const handleSearchClick = () => {
    navigate("/properties",{
      state: {location,checkInDate,checkOutDate}
    })
  }

  return (
  <Container>
    <SearchContainer>
      <LocationWrapper>
        <Title>Location</Title>
        <Desc 
          placeholder="Where are you going?" 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </LocationWrapper>

      <CheckInWrapper>
        <Title>Check In Date</Title>
        <Desc 
          placeholder="Start date" 
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </CheckInWrapper>

      <CheckOutWrapper>
        <Title>Check Out Date</Title>
        <Desc 
          placeholder="End date" 
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </CheckOutWrapper>

      <SearchWrapper>
        <SearchButton onClick={handleSearchClick}>
          <SearchRounded sx={{ color: "inherit",fontSize:"32" }}/>
        </SearchButton>
      </SearchWrapper>
    </SearchContainer>
  </Container>
  ) 
};

export default Home;
