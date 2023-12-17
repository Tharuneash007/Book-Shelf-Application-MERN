import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../extras/Spinner'
import BackButton from '../extras/BackButton'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:7000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Succesfully', { variant: 'success' });
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        // alert('An error happened, Plese check Console!')
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 '>Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h3 className='text-2xl'>Are You Sure You Want to delete this book ?</h3>
          <button className='p-4 bg-red-600 text-white m-8 w-full rounded-lg' onClick={handleDeleteBook}>Yes, Delete It</button>
        </div>
      )}
    </div>
  )
}

export default DeleteBook