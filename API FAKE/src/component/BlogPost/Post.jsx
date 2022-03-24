import React from "react";

const Post = (props) => {
        return(
            <div className="artikel">
                <div className="gambar-artiekl me-3">
                    <img src="https://placeimg.com/80/80/tech" className="mt-2" alt="Gambar Tumbnail Artikel" />
                    </div>
                    <div className="konten-artikel">
                        <div className="judul-artikel">{props.judul}</div>
                        <p className = "isi-artikel">{props.isi}</p>
                        <button className="btn btn-sm btn-danger" onClick={() => props.hapusArtikel(props.id)}>Hapus</button>
                    </div>
                </div>
            
        )
    }
export default Post;