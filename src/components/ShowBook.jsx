import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../extras/BackButton';
import Spinner from '../extras/Spinner'

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:7000/books/${id}`)
      .then((response) => {
        setBook(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }, [])
  console.log(book);

  return (
    <div className='p-5'>
      <BackButton />
      <h1 className='text-3xl my-4'>{book.title}</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-500 rounded-xl w-fit p-4 bg-slate-100'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-600'>Id :</span>
            <span >{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-600'>Title :</span>
            <span >{book.title}</span>
          </div>
          <div className='my-4'>
            < span className='text-xl mr-4 text-gray-600' > Author :</span >
            <span >{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-600'>Publish Year :</span>
            <span >{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-600'>Created Time :</span>
            <span >{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            < span className='text-xl mr-4 text-gray-500' > Updated Time :</span >
            <span >{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook