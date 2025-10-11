import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { placeholderImage } from '../data/categories';

const CategoryDetail = () => {
  const { id } = useParams();
  const { categories } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);

  const category = categories.find(cat => cat.id === parseInt(id));

  if (!category) {
    return (
      <div className="container">
        <div className="not-found">
          <div className="not-found-content">
            <h2>Category Not Found</h2>
            <p>The category you're looking for doesn't exist.</p>
            <Link to="/" className="back-btn">
              <span className="btn-icon">←</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-detail">
      <div className="container">
        <Link to="/" className="back-btn">
          <span className="btn-icon">←</span>
          Back to Categories
        </Link>
        
        <div className="category-header">
          <h1 className="category-title">{category.name}</h1>
          <p className="category-description">{category.description}</p>
        </div>

        <div className="gallery-section">
          {category.images && category.images.length > 0 ? (
            <div className="gallery-grid">
              {category.images.map((image, index) => (
                <div 
                  key={index} 
                  className="gallery-item"
                  onClick={() => setSelectedImage({ image, index })}
                >
                  <div className="gallery-image-container">
                    <img 
                      src={image} 
                      alt={`${category.name} design ${index + 1}`}
                      className="gallery-image"
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                    />
                    <div className="image-overlay">
                      <span className="view-icon">👁️</span>
                    </div>
                  </div>
                  <div className="image-info">
                    <p className="image-description">
                      {category.imageDescriptions?.[index] || 'Beautiful decoration design'}
                    </p>
                    <span className="image-number">Design #{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-images">
              <div className="no-images-content">
                <span className="no-images-icon">🖼️</span>
                <h3>No Images Available</h3>
                <p>Check back later for amazing designs in this category.</p>
              </div>
            </div>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="close-modal"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <div className="modal-image-container">
                <img 
                  src={selectedImage.image} 
                  alt="Enlarged view"
                  className="modal-image"
                  onError={(e) => {
                    e.target.src = placeholderImage;
                  }}
                />
              </div>
              <div className="modal-info">
                <h3>{category.name} - Design #{selectedImage.index + 1}</h3>
                <p className="modal-description">
                  {category.imageDescriptions?.[selectedImage.index] || 'Beautiful decoration design'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;