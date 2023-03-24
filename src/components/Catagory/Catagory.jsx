import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './catagory.css';
import { isAuthenticated } from '../../helper/helper';
const Catagory = () => {
    const [category, setCategory] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const url = process.env.REACT_APP_API;
    const token = isAuthenticated();
    const navigate = useNavigate();

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (category && selectedColor) {
            const postData = await fetch(`${url}/Category`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    authorization: `${token}`
                },
                body: JSON.stringify({
                    Category: category,
                    color: selectedColor
                })
            })
            const data = await postData.json()
            if (data.error) {
                alert(data.error)
            } else {
                navigate(`/form/${data.data._id}`);
            }
            console.log('Category:', category, 'Selected color:', selectedColor);
        } else {
            alert("Please select a category and Color")
        }
    };
    console.log(selectedColor);

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2 className="form-heading">Add a new category</h2>
                <div className="form-field-container">
                    <label htmlFor="category-field">Category:</label>
                    <input
                        type="text"
                        id="category-field"
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    />
                </div>
                <div className="form-field-container">
                    <label htmlFor="color-picker">Color:</label>
                    <input
                        type="color"
                        id="color-picker"
                        value={selectedColor}
                        onChange={handleColorChange}
                    />
                </div>
                <button type="submit" className="submit-button">
                    Next
                </button>
            </form>
        </>
    );
};

export default Catagory;
