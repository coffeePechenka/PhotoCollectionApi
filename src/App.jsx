
import { useEffect, useState } from 'react'
import './App.css'
import Collection from './components/Collection/Collection'

function App() {
  const [categoryId, setCategoryId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [collection, setCollection] = useState([])

  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : '' 

    fetch(`https://66b3b7fe7fba54a5b7edf6c0.mockapi.io/photo_collections?page=${page}&limit=4&${category}`)
    .then(res => res.json())
    .then(json => {
      setCollection(json)
    })
    .catch(err => {
      console.warn(err)
      alert("Ошибка при получении данных")
    })
    .finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
      <div className='App'>
        <h1>Моя коллекция фотографий</h1>
        <div className="top">
          <ul className="tags">
            {cats.map((obj, i) => (
              <li onClick={() => setCategoryId(i)} className={categoryId == i ? 'active' : ''} key={obj.name}>{obj.name} </li> 
            ))}
          </ul>
          <input 
          value={searchValue} 
          onChange={e => setSearchValue(e.target.value)} 
          type="text" 
          placeholder='Enter' 
          />
        </div>
        <div className="content">
          {isLoading ? (
            <h2>Идет загрузка...</h2>
          ) : (
            collection
          .filter((obj) =>  obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
            <Collection
            key={index}
            name={obj.name}
            images={obj.photos}
          />
          ))
          ) }
        </div>
        <ul className="pagination">
          {
            [...Array(5)].map((obj, i) => (
            <li onClick={() => setPage(i + 1)} className={page == (i + 1) ? 'active' : ''} >
              {i + 1} 
            </li> 
          ))
          }
        </ul>
      </div>
  )
}

export default App
