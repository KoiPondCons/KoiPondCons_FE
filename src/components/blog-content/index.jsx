import React from 'react'
import Header from '../header'
import Footer from '../footer'
import './index.css'
function BlogContent() {
    return (
        <div>
            <Header />
            <div className='blog-content-body' style={{ background: "white" , width: "100%",height: "100vh", margin: "0 auto", padding: " 2% 20%"}}>
                <h1>Blog Content</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
            <Footer />
        </div>
    )
}

export default BlogContent