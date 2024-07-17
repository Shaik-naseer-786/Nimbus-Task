import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Button, Box } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const ProductList = ({ company }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (availability) params.append('availability', availability);
        if (sortOption) {
          if (sortOption === 'price-asc') {
            params.append('_sort', 'price');
            params.append('_order', 'asc');
          } else if (sortOption === 'price-desc') {
            params.append('_sort', 'price');
            params.append('_order', 'desc');
          } else if (sortOption === 'rating') {
            params.append('_sort', 'rating');
            params.append('_order', 'desc');
          }
        }

        const endpoint = selectedCategory
          ? `http://localhost:3000/companies/${company}/categories/${selectedCategory}/products`
          : `http://localhost:3000/companies/${company}/products`;

        const response = await fetch(`${endpoint}?${params.toString()}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [company, selectedCategory, minPrice, maxPrice, availability, sortOption]);

  return (
    <div>
      <Box sx={{ padding: '16px', backgroundColor: '#f5f5f5', marginBottom: '16px' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Availability</InputLabel>
          <Select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            startAdornment={<SortIcon />}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="rating">Rating: High to Low</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => setAvailability('no')}>Filter Availability No</Button>
        <Button variant="contained" onClick={() => setAvailability('yes')}>Filter Availability Yes</Button>
      </Box>
      <Grid container spacing={3} style={{ padding: '24px' }}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {product.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Availability: {product.availability ? 'Yes' : 'No'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
