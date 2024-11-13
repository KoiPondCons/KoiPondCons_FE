import React from "react";
import "./index.css";

function index() {
    return (
        <div className="card-project"> {/* Changed class name here */}
            <p>
                <span>LÀNG THONG DONG</span>
                <img src="https://images.unsplash.com/photo-1654225718758-79c6f724183a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Description 1" />
                <div className="overlay"></div> {/* Lớp phủ để làm tối hình ảnh */}
            </p>
            <p>
                <span>PENTHOUSE OPAL TOWER</span>
                <img src="https://images.unsplash.com/photo-1706207334456-00107e9f90aa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Description 2" />
                <div className="overlay"></div>
            </p>
            <p>
                <span>The Retreat Garden</span>
                <img src="https://images.unsplash.com/photo-1522131761527-37bb88886b97?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Description 3" />
                <div className="overlay"></div>
            </p>
            <p>
                <span>VIEN LE JARDIN</span>
                <img src="https://images.unsplash.com/photo-1616666720022-b90e39d9f580?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Description 4" />
                <div className="overlay"></div>
            </p>
        </div>
    )
}

export default index;
