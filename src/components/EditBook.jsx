import React from 'react'
import { useState, useEffect } from 'react'
import BackButton from '../extras/BackButton'
import Spinner from '../extras/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:7000/books/${id}`)
      .then((response) => {
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setPublishYear(response.data.publishYear)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        alert('An error happened, Plese check Console!')
        console.log(error);
      })

  }, [])


  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true);
    axios.put(`http://localhost:7000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited Succesfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened, Plese check Console!')
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      })

  };

  return (
    <div className='p-5'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-500 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-md'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 '>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-md'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-md'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8 rounded-lg' onClick={handleEditBook}>
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default EditBook