import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import { get } from 'http';
import Post from './Post/Post'

const baseUrl = `https://practiceapi.devmountain.com/api/posts`

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(baseUrl).then(res => {
      this.setState({ posts: res.data })
    }).catch(err => console.log('error: ', err))
  }

  updatePost(id, text) {
    axios
    .put(`${baseUrl}?id=${id}`, {text})
    .then(res => {this.setState({
      posts: res.data});
    })
    .catch(err => console.log('error update: ', err))
  }
  
  deletePost(id) {
    axios
    .delete(`${baseUrl}?id=${id}`)
    .then(res => this.setState({
      posts: res.data}))
    .catch(err => console.log('error delete: ', err))
    }

  createPost(text) {
    axios.post(baseUrl, {text})
    .then(res => {this.setState({
      posts: res.data})
    })
    .catch(err => console.log('error create: ', err)) 
  }

  render() {
    const { posts } = this.state;
    
    return (
      <div className="App__parent">
    <Header />
    
    <section className="App__content">
    
    <Compose createPostFn={this.createPost}/>
    
    {
      posts.map(post => (
        <Post key={ post.id } text={ post.text } date={ post.date } updatePostFn={this.updatePost} id={post.id}
        deletePostFn={this.deletePost}/>
      ))
    }
        </section>
      </div>
    );
  }
}

export default App;
