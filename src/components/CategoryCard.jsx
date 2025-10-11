import React from 'react';
import { Link } from 'react-router-dom';
import { placeholderImage } from '../data/categories';

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <Link to={`/category/${category.id}`} className="card-link">
        <div className="card-image-container">
          <img 
            src={category.image || placeholderImage} 
            alt={category.name}
            className="card-image"
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
          <div className="card-overlay">
            <span className="view-gallery">View Gallery →</span>
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">{category.name}</h3>
          <p className="card-description">{category.description}</p>
          <div className="card-footer">
            <span className="image-count">
              {category.images?.length || 0} designs available
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;