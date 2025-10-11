import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCategories } from '../data/categories';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedCategories = localStorage.getItem('decoratorCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
      localStorage.setItem('decoratorCategories', JSON.stringify(initialCategories));
    }
  }, []);

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now(),
      images: category.images || [],
      imageDescriptions: category.imageDescriptions || Array(category.images?.length || 0).fill('')
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('decoratorCategories', JSON.stringify(updatedCategories));
  };

  const updateCategory = (id, updatedCategory) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id ? { ...cat, ...updatedCategory } : cat
    );
    setCategories(updatedCategories);
    localStorage.setItem('decoratorCategories', JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('decoratorCategories', JSON.stringify(updatedCategories));
  };

  const addImageToCategory = (categoryId, imageUrl, description = '') => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const currentImages = cat.images || [];
        const currentDescriptions = cat.imageDescriptions || [];
        
        return {
          ...cat,
          images: [...currentImages, imageUrl],
          imageDescriptions: [...currentDescriptions, description]
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
    localStorage.setItem('decoratorCategories', JSON.stringify(updatedCategories));
  };

  const removeImageFromCategory = (categoryId, imageIndex) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const updatedImages = [...(cat.images || [])];
        const updatedDescriptions = [...(cat.imageDescriptions || [])];
        
        updatedImages.splice(imageIndex, 1);
        updatedDescriptions.splice(imageIndex, 1);
        
        return {
          ...cat,
          images: updatedImages,
          imageDescriptions: updatedDescriptions
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
    localStorage.setItem('decoratorCategories', JSON.stringify(updatedCategories));
  };

  const updateImageDescription = (categoryId, imageIndex, description) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const updatedDescriptions = [...(cat.imageDescriptions || [])];
        if (imageIndex >= 0 && imageIndex < updatedDescriptions.length) {
          updatedDescriptions[imageIndex] = description;
        }
        
        return {
          ...cat,
          imageDescriptions: updatedDescriptions
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
    localStorage.setItem('decoratorCategories', JSON.stringify(updatedCategories));
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addImageToCategory,
    removeImageFromCategory,
    updateImageDescription,
    isAdmin,
    setIsAdmin
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};