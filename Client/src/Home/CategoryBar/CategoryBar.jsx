import React from "react";
import "./CategoryBar.css";
import { Link } from "react-router-dom";
import a from '../../assets/minutes.webp';
import b from '../../assets/mobiles.png';
import c from '../../assets/Fashion.webp';
import d from '../../assets/Electronics.webp';
import e from '../../assets/Home&Furniture.jpg';
import f from '../../assets/Tv&Appliances.jpg';
import g from '../../assets/Flight Booking.png';
import h from '../../assets/Beauty.png';
import i from '../../assets/Grocery.png';

// The component now accepts a prop `onCategoryHover` to trigger the dropdown.
export default function CategoryBar({ onCategoryHover }) {
  // We've created an array of objects. Each object has the category name and its specific image source.
  // This is a cleaner way to manage the data.
  const categoryData = [
    { name: "Minutes", imgSrc: a, pageSrc:"/MinutesPage" },
    { name: "Mobiles & Tablet ", imgSrc: b, pageSrc:"*" },
    { name: "Fashion", imgSrc: c, pageSrc:"*" },
    { name: "Electronics", imgSrc: d, pageSrc:"*" },
    { name: "Home & Furniture", imgSrc: e, pageSrc:"*" },
    { name: "TVs & Appliances", imgSrc: f, pageSrc:"*" },
    { name: "Flight Bookings", imgSrc: g, pageSrc:"*" },
    { name: "Beauty, Food..", imgSrc: h, pageSrc:"*" },
    { name: "Grocery", imgSrc: i, pageSrc:"*" },
  ];

  return (
    <div className="category-bar">
      {/* We now map over the `categoryData` array. */}
      {categoryData.map((category) => (
        <div
          key={category.name}
          className="category-item"
          // When the mouse enters, it tells the parent component which category is active.
          onMouseEnter={() => onCategoryHover(category.name)}
        >
          {/* The correct image source and alt text are used for each item. */}

          <Link to={category.pageSrc}>
          <img src={category.imgSrc} alt={category.name} />
          <span>{category.name}</span>
          </Link>

        </div>
      ))}
    </div>
  );
}
