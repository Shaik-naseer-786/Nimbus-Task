import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Pagination, TextField, Button, MenuItem, Select, InputLabel, FormControl, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Image = styled('img')({
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '10px',
});

function ProductsPage() {
    const [productsDataList, setProductsDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [companyName, setCompanyName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [top, setTop] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const itemsPerPage = 9;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = productsDataList
        .filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        fetchData();
    }, [companyName, categoryName, top, minPrice, maxPrice, availability, sortCriteria]);

    const fetchData = async () => {
        try {
            const url = constructURL();
            const response = await axios.get(url);
            let products = response.data;

            if (sortCriteria === 'price-asc') {
                products = products.sort((a, b) => a.price - b.price);
            } else if (sortCriteria === 'price-desc') {
                products = products.sort((a, b) => b.price - a.price);
            } else if (sortCriteria === 'reviews') {
                products = products.sort((a, b) => b.rating - a.rating);
            }

            setProductsDataList(products);

        } catch (error) {
            console.error("Error fetching the data", error);
            // Handle error state or display a message to the user
        }
    };

    const constructURL = () => {
        let url = 'http://localhost:3000/products';

        if (companyName && categoryName) {
            url = `http://localhost:3000/companies/${companyName}/categories/${categoryName}/products`;
        } else if (companyName) {
            url = `http://localhost:3000/companies/${companyName}/products`;
        } else if (categoryName) {
            url = `http://localhost:3000/categories/${categoryName}/products`;
        }

        const queryParams = [];
        if (top) queryParams.push(`_limit=${top}`);
        if (minPrice) queryParams.push(`minPrice=${minPrice}`);
        if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);
        if (availability) queryParams.push(`availability=${availability}`);

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        return url;
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleFilterChange = (filter, value) => {
        switch (filter) {
            case 'companyName':
                setCompanyName(value);
                break;
            case 'categoryName':
                setCategoryName(value);
                break;
            case 'top':
                setTop(value);
                break;
            case 'minPrice':
                setMinPrice(value);
                break;
            case 'maxPrice':
                setMaxPrice(value);
                break;
            case 'availability':
                setAvailability(value);
                break;
            case 'sortCriteria':
                setSortCriteria(value);
                break;
            default:
                break;
        }

        // Call fetchData directly when filters change
        fetchData();
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleDrawer(true)}
                    style={{ marginRight: '10px' }}
                >
                    Filters
                </Button>
            </div>

            <Drawer
                anchor='left'
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <List style={{ width: '250px', padding: '20px' }}>
                    <ListItem>
                        <ListItemText primary="Filters" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Company</InputLabel>
                            <Select
                                value={companyName}
                                onChange={(e) => handleFilterChange('companyName', e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="AMZ">AMZ</MenuItem>
                                <MenuItem value="FLP">FLP</MenuItem>
                                <MenuItem value="SNP">SNP</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={categoryName}
                                onChange={(e) => handleFilterChange('categoryName', e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Laptop">Laptop</MenuItem>
                                <MenuItem value="Phone">Phone</MenuItem>
                                <MenuItem value="Computer">Computer</MenuItem>
                                <MenuItem value="TV">TV</MenuItem>
                                <MenuItem value="Pendrive">Pendrive</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Top N Products"
                            variant="outlined"
                            type="number"
                            value={top}
                            onChange={(e) => handleFilterChange('top', e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Min Price"
                            variant="outlined"
                            type="number"
                            value={minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Max Price"
                            variant="outlined"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Availability</InputLabel>
                            <Select
                                value={availability}
                                onChange={(e) => handleFilterChange('availability', e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortCriteria}
                                onChange={(e) => handleFilterChange('sortCriteria', e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                                <MenuItem value="reviews">Reviews</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { setCurrentPage(1); setDrawerOpen(false); }}
                            fullWidth
                        >
                            Apply Filters
                        </Button>
                    </ListItem>
                </List>
            </Drawer>

            <Grid container spacing={4} justifyContent="center">
                {currentProducts.map((product, idx) => (
                    <Grid item xs={10} sm={6} md={4} key={idx}>
                        <Item>
                            <Image src={product.imageUrl} alt={product.productName} />
                            <h2>{product.productName}</h2>
                            <p>Company: {product.company}</p>
                            <p>Category: {product.category}</p>
                            <p>Discount: {product.discount}%</p>
                            <p>Price: ${product.price}</p>
                            <p>Rating: {product.rating} stars</p>
                            <p>Availability: {product.availability}</p>
                        </Item>
                    </Grid>
                ))}
            </Grid>

            <Pagination
                count={Math.ceil(productsDataList.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </>
    );
}

export default ProductsPage;
