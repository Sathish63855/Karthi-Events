import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Admin = () => {
  const { 
    categories, 
    addCategory, 
    updateCategory,
    deleteCategory, 
    addImageToCategory,
    removeImageFromCategory,
    updateImageDescription,
    isAdmin,
    setIsAdmin 
  } = useApp();

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [newCategory, setNewCategory] = useState({name: '',description: '',image: ''});
  const [newImage, setNewImage] = useState({ categoryId: '', imageUrl: '', description: ''});
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingImage, setEditingImage] = useState({ categoryId: '', imageIndex: null, description: ''});
  const [activeTab, setActiveTab] = useState('categories');

  const adminUsers = [
    { username: 'karthi', password: 'karthi123' },
    { username: 'sathish', password: 'sathish123' },
    { username: 'yuvaraj', password: 'yuvaraj123' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = adminUsers.find(
      user =>
        user.username === loginData.username &&
        user.password === loginData.password
    );
    if (foundUser) {
      setIsAdmin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name && newCategory.description) {
      addCategory(newCategory);
      setNewCategory({ name: '', description: '', image: '' });
      alert('Category added successfully!');
    }
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (editingCategory && editingCategory.name && editingCategory.description) {
      updateCategory(editingCategory.id, editingCategory);
      setEditingCategory(null);
      alert('Category updated successfully!');
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (newImage.categoryId && newImage.imageUrl) {
      addImageToCategory(parseInt(newImage.categoryId), newImage.imageUrl, newImage.description);
      setNewImage({ categoryId: '', imageUrl: '', description: '' });
      alert('Image added successfully!');
    }
  };

  const handleRemoveImage = (categoryId, imageIndex) => {
    if (window.confirm('Are you sure you want to remove this image?')) {
      removeImageFromCategory(categoryId, imageIndex);
      alert('Image removed successfully!');
    }
  };

  const handleUpdateImageDescription = (e) => {
    e.preventDefault();
    if (editingImage.categoryId && editingImage.imageIndex !== null) {
      updateImageDescription(
        parseInt(editingImage.categoryId), 
        editingImage.imageIndex, 
        editingImage.description
      );
      setEditingImage({ categoryId: '', imageIndex: null, description: '' });
      alert('Image description updated successfully!');
    }
  };

  const startEditImage = (categoryId, imageIndex) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.images && category.images[imageIndex]) {
      const currentDescription = category.imageDescriptions?.[imageIndex] || '';
      setEditingImage({
        categoryId: categoryId,
        imageIndex: imageIndex,
        description: currentDescription
      });
      setActiveTab('images');
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2>Admin Login</h2>
              <p>Access the management panel</p>
            </div>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="form-input"
                  required
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="form-input"
                  required
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div className="admin-title">
            <h1>Admin Dashboard</h1>
            <p>Manage your event decoration content</p>
          </div>
          <button onClick={() => setIsAdmin(false)} className="logout-btn">
            <span className="btn-icon">🚪</span>
            Logout
          </button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            📁 Categories
          </button>
          <button 
            className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            🖼️ Images
          </button>
          <button 
            className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            ⚙️ Manage
          </button>
        </div>

        {/* Add Category Form */}
        {activeTab === 'categories' && (
          <section className="admin-section">
            <h2>Add New Category</h2>
            <form onSubmit={handleAddCategory} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="form-input"
                    required
                    placeholder="Enter category name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Main Image URL</label>
                  <input
                    type="url"
                    value={newCategory.image}
                    onChange={(e) => setNewCategory({...newCategory, image: e.target.value})}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="form-textarea"
                  required
                  placeholder="Enter category description"
                  rows="3"
                />
              </div>
              <button type="submit" className="submit-btn">
                <span className="btn-icon">➕</span>
                Add Category
              </button>
            </form>
          </section>
        )}

        {/* Add Images Form */}
        {activeTab === 'images' && (
          <section className="admin-section">
            <h2>Add Images to Category</h2>
            <form onSubmit={handleAddImage} className="admin-form">
              <div className="form-group">
                <label className="form-label">Select Category</label>
                <select
                  value={newImage.categoryId}
                  onChange={(e) => setNewImage({...newImage, categoryId: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={newImage.imageUrl}
                  onChange={(e) => setNewImage({...newImage, imageUrl: e.target.value})}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Image Description</label>
                <textarea
                  value={newImage.description}
                  onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                  className="form-textarea"
                  placeholder="Describe this image..."
                  rows="3"
                />
              </div>
              <button type="submit" className="submit-btn">
                <span className="btn-icon">🖼️</span>
                Add Image
              </button>
            </form>

            {/* Edit Image Description */}
            {editingImage.imageIndex !== null && (
              <div className="edit-section">
                <h3>Edit Image Description</h3>
                <form onSubmit={handleUpdateImageDescription} className="admin-form">
                  <div className="form-group">
                    <label className="form-label">Image Description</label>
                    <textarea
                      value={editingImage.description}
                      onChange={(e) => setEditingImage({...editingImage, description: e.target.value})}
                      className="form-textarea"
                      placeholder="Describe this image..."
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                      <span className="btn-icon">💾</span>
                      Update Description
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditingImage({ categoryId: '', imageIndex: null, description: '' })}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        )}

        {/* Manage Categories */}
        {activeTab === 'manage' && (
          <section className="admin-section">
            <h2>Manage Categories ({categories.length})</h2>
            <div className="categories-management">
              {categories.map(category => (
                <div key={category.id} className="management-card">
                  <div className="card-header">
                    <h3>{category.name}</h3>
                    <div className="card-actions">
                      <button 
                        onClick={() => setEditingCategory(category)}
                        className="edit-btn"
                      >
                        <span className="btn-icon">✏️</span>
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Delete "${category.name}"?`)) {
                            deleteCategory(category.id);
                          }
                        }}
                        className="delete-btn"
                      >
                        <span className="btn-icon">🗑️</span>
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="card-description">{category.description}</p>
                  <div className="card-stats">
                    <span className="stat">{category.images?.length || 0} Images</span>
                  </div>

                  {/* Category Images */}
                  {category.images && category.images.length > 0 && (
                    <div className="card-images">
                      <h4>Images:</h4>
                      <div className="images-grid">
                        {category.images.map((image, index) => (
                          <div key={index} className="image-management-item">
                            <img 
                              src={image} 
                              alt={`${category.name} ${index + 1}`}
                              className="management-image"
                            />
                            <div className="image-management-actions">
                              <button 
                                onClick={() => startEditImage(category.id, index)}
                                className="edit-desc-btn"
                              >
                                Edit Desc
                              </button>
                              <button 
                                onClick={() => handleRemoveImage(category.id, index)}
                                className="remove-image-btn"
                              >
                                Remove
                              </button>
                            </div>
                            <p className="image-desc-preview">
                              {category.imageDescriptions?.[index] || 'No description'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Edit Category Form */}
            {editingCategory && (
              <div className="edit-modal">
                <div className="edit-modal-content">
                  <h3>Edit Category: {editingCategory.name}</h3>
                  <form onSubmit={handleUpdateCategory} className="admin-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Category Name</label>
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Main Image URL</label>
                        <input
                          type="url"
                          value={editingCategory.image || ''}
                          onChange={(e) => setEditingCategory({...editingCategory, image: e.target.value})}
                          className="form-input"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        value={editingCategory.description}
                        onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                        className="form-textarea"
                        required
                        rows="3"
                      />
                    </div>
                    <div className="form-buttons">
                      <button type="submit" className="submit-btn">
                        <span className="btn-icon">💾</span>
                        Update Category
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEditingCategory(null)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Admin;