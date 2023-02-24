import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from 'react-bootstrap/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectInput from '@mui/material/Select/SelectInput';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CATEGORIES_BASE_URL } from 'config/networkConfigs';
import axios from 'axios';
import { headerAuthInterceptor } from 'config/headerIntercepter.js';
import { PRODUCTS_BASE_URL } from 'config/networkConfigs';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProductModel(props) {
    const {product:productProps,isEdit,open,handleClose} =props;
    const [categories, setCategories] = React.useState([]);
    const [sizes, setSizes] = React.useState({
        S: false,
        XS: false,
        M: false,
        L: false,
        XL: false,
        XXL: false
    });
    const [currentCategory, setCurrentCategory] = React.useState('');
    const [isError,setIsError] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [product, setProduct] = React.useState({});
   
    const handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setProduct((previosState) => { return { ...previosState, [nam]: val } });
    }

    const handleSelectCategory = (event) => {
        setCurrentCategory(event.target.value);
        setProduct((previosState) => { return { ...previosState, categories: event.target.value } });
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setIsError(false);
        try {
            if(isEdit){
                const res = await axios.patch(`${PRODUCTS_BASE_URL}/${product._id}`, product, { headers: headerAuthInterceptor() });
            }else{
                const res = await axios.post(PRODUCTS_BASE_URL, product, { headers: headerAuthInterceptor() });
            }
            window.location.reload()
        } catch (error) {
            setIsError(true);
            setIsSubmitting(false);
        }
        setIsSubmitting(false);
    }
    const handleSelectSize = (event) => {
        setSizes((previosState)=>{
            const state = {...previosState,
                [event.target.name]: event.target.checked,};
            setProduct((previosState) => { return { ...previosState, size: Object.keys(state).filter(e=>state[e]) } });
            return state;

        });
    };
    async function loadCategories() {
        try {
            const res = await axios.get(CATEGORIES_BASE_URL, { headers: headerAuthInterceptor() });
            setCategories(res.data)
        } catch (error) {

        }
    };
    React.useEffect(() => {
        loadCategories();
    }, [])
    React.useEffect(()=>{
       async function loadModelDetail(){
            await loadCategories();
            if(isEdit){
                setProduct(productProps);
                setCurrentCategory(productProps.categories)
                setSizes({...sizes,...productProps.size.reduce((acc,curr)=> (acc[curr]=true,acc),{})})
            }
            else{
                setProduct({});
                setCurrentCategory('')
                setSizes({
                    S: false,
                    XS: false,
                    M: false,
                    L: false,
                    XL: false,
                    XXL: false
                })
            }
       }
        loadModelDetail();
    },[productProps])
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>
                        {isEdit?"Edit Product":"Create Product"}
                        {isError? <Box class="alert alert-danger" role="alert">
                            An error had occurs
                        </Box>:""}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="title"
                                name="title"
                                label="Title"
                                fullWidth
                                autoComplete="title"
                                variant="standard"
                                onChange={handleChange}
                                value={product.title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="categories-lable">Categories</InputLabel>
                                <Select
                                    required
                                    labelId="categories-lable"
                                    id="categories"
                                    name="categories"
                                    label="Categories"
                                    fullWidth
                                    autoComplete="categories"
                                    variant="outlined"
                                    onChange={handleSelectCategory}
                                    value={currentCategory}

                                >
                                    {categories.map((e, index) => <MenuItem tabIndex={index} role="option" key={e._id} value={e.cat}>{e.nameCate}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                type="number"
                                id="price"
                                name="price"
                                label="Price"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                value={product.price}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="description"
                                name="desc"
                                label="Description"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                value={product.desc}


                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="stock"
                                name="quantity"
                                label="Stock Quantity"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                value={product.quantity}


                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="sizes-lable">Sizes</InputLabel>
                                <Select
                                    required
                                    labelId="sizes-lable"
                                    id="sizes"
                                    name="sizes"
                                    label="sizes"
                                    fullWidth
                                    variant="outlined"
                                >
                                    {Object.keys(sizes).map((e, index) => <FormControlLabel
                                        label={e}
                                        control={<Checkbox className="ml-3" name={e} checked={sizes[e]} onChange={handleSelectSize} />}
                                    />)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="image"
                                name="img"
                                label="Image"
                                fullWidth
                                autoComplete="image"
                                variant="standard"
                                onChange={handleChange}
                                value={product.img}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className="text-right">
                            <Button onClick={handleSubmit} disabled={isSubmitting} className="pull-right m-3" variant="primary">{isEdit?"Save":"Add"}</Button>
                        </Grid>

                    </Grid>

                </Box>
            </Modal>
        </div>
        );
}