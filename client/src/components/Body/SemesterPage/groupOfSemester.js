import React from "react";
import { Link } from 'react-router-dom';
import "./groupOfSemester.css";
import Card from './semesterCard';

const cardlist = () => {
  return (
    <>
      <h1 style = {{marginLeft:'200px', padding:'40px 0px 0px 0px'}}>Choose Your Semester</h1>
      <div className="card-list">
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semesterid = "1"/>
        </Link>
        <Card semesterid = "2"/>
        <Card semesterid = "3"/>
        <Card semesterid = "4"/>
        <Card semesterid = "1"/>
        <Card semesterid = "2"/>
        <Card semesterid = "3"/>
        <Card semesterid = "4"/>
      </div>
    </>
  );
};

export default cardlist;
