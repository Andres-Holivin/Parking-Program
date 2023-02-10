
import BottomNavBar from 'components/BottomNavBar';
import CardType from 'components/CardType';
import Layout from 'components/Layout';
import TopNavBar from 'components/TopNavBar';
import { Avatar, Box, Button, Flex, Grid, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Switch, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'

import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Home() {
  const CardText = {
    checkIn: {
      image: "/In.jpg",
      href: "CheckIn",
      type: "Check In",
      text: "Vehicle enters the parking area",
      desc: "The checking post usually consists of a guard or a camera that can take a picture or scan the car's license plate. The purpose of the check is to ensure that only authorized vehicles are allowed access to the parking lot."
    },
    checkOut: {
      image: "/Out.jpg",
      href: "CheckOut",
      type: "Check Out",
      text: "Vehicle leaving the parking area",
      desc: "The vehicle must be sure to pay the parking fee before exiting. This can be done using a post pay system, which requires the driver to input their payment information and the amount of time they were parked."
    }
  }
  return (
    <Layout>
      <HStack justifyContent="center" gap="12">
        <CardType data={CardText.checkIn} />
        <CardType data={CardText.checkOut} />
      </HStack>
    </Layout>
  )
}
