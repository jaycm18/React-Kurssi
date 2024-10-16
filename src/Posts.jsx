import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //muutetaan json data javascriptiksi
  .then(oliot => setPosts(oliot))
},[]
)

const handleButtonClick = () => {
    setShowPosts(!showPosts)
  }

  return (
    <>
      <h2>Posts from Typicode</h2>
      <button onClick={handleButtonClick}>
        {showPosts ? 'Hide Posts' : 'Show Posts'}
      </button>
      {showPosts && (
        <div>
          {posts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Posts