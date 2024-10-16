import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //muutetaan json data javascriptiksi
  .then(oliot => setPosts(oliot))
},[]
)

  return (
    <>
        <h2>Posts from typicode</h2>

        {
          posts && posts.map(p =>

            <div className='posts' key={p.id}>

            <p>{p.title}</p>
            
            </div>
            )
        }

    </>
  )
}

export default Posts