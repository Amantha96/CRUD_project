import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate();
    const location =useLocation();

    const bookId= location.pathname.split("/")[2]

    console.log(location.pathname.split("/")[2])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8080/books",bookId, book);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    console.log(book);

    return (
        <div className="form">
            <h1>Update the Book</h1>
            <input
                type="text"
                name="title"
                placeholder='title'
                value={book.title}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="desc"
                placeholder='desc'
                value={book.desc}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="price"
                placeholder='price'
                value={book.price || ''}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="cover"
                placeholder='cover'
                value={book.cover}
                onChange={handleInputChange}
            />
             <button className="formButton" onClick={handleClick}>Add</button>

        </div>
    );
}

export default Update;
