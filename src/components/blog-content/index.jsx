import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../header'
import Footer from '../footer'
import './index.css'
import { createClient } from "contentful";

function BlogContent() {
    const client = createClient({ space: "7cnffzqr25eq", accessToken: "S0LVPWr1CNSz3SyvHQUsOjgsXS_L1a2V8uV7z8LzrNU" });
    const { id } = useParams();
    const [singleBlog, setSingleBlog] = useState([]);
    console.log(id);
    useEffect(() => {
        const getBlogContent = async () => {
            try {
                await client.getEntry(id).then((entry) => {
                    setSingleBlog(entry);
                    console.log(entry);
                });
            } catch (error) {
                console.log(error);
            }
        }
        getBlogContent();
    }, []);
    return (
        <div>
            <Header />
            <div className='blog-content-body' style={{ background: "white", width: "100%", margin: "0 auto", padding: " 2% 20%" }}>
                <h1>{singleBlog?.fields?.tittle}</h1>
                <p>{singleBlog?.fields?.blog}</p>
                <img src={singleBlog?.fields?.image?.fields?.file?.url} alt={singleBlog?.fields?.tittle} />
            </div>
            <Footer />
        </div>
    )
}

export default BlogContent