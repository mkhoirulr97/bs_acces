import React, { Component } from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";

class BlogPost extends Component {
    state = {
        listArtikel: [],
        insertArtikel: {
            userId: 1,
            id: 1,
            title: "",
            body: ""
        }
    }
    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        this.ambilDataDariServerAPI()

    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/posts')
            .then(response => response.json())
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    listArtikel: jsonHasilAmbilDariAPI
                })
            })
    }

    handleHapusArtikel = (data) => {
        fetch(`http://localhost:3001/posts/${data}`,
            {
                method: 'DELETE',
            }
        )
            .then(response => {
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahArtikel = (event) => {
        let formInsertArtikel = { ...this.state.insertArtikel }

        let timestamp = new Date().getTime();

        formInsertArtikel['id'] = timestamp;
        formInsertArtikel[event.target.name] = event.target.value;
        this.setState({
            insertArtikel: formInsertArtikel
        })
    }

    handleTombolSimpan = () => {
        fetch(`http://localhost:3001/posts`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.insertArtikel)
            }
        ).then(res => {
            this.ambilDataDariServerAPI()
            
        })

        this.setState({
            ...this.ambilDataDariServerAPI
        })
        this.setState((prevState) => ({
            insertArtikel: {       
               ...prevState,             
               title: "",
               body: ""
           }
       }))
    }

    render() {
        return (
            <>
            <h1 className="text-center mb-5">Aplikasi BS Access</h1>
            <div class="post-artikel">
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Nama Studio</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.insertArtikel.title} onChange={this.handleTambahArtikel} name="title" id="title" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Deskripsi</label>
                        <div className="col-sm-10">
                            <textarea rows={3} type="text" value={this.state.insertArtikel.body} onChange={this.handleTambahArtikel} name="body" id="body" className="form-control" >
                            </textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2 className="mt-5">Daftar Studio</h2>
                {
                    this.state.listArtikel.map(artikel => {
                        return <Post key={artikel.id} id={artikel.id} judul={artikel.title} isi={artikel.body} hapusArtikel={this.handleHapusArtikel} />
                    })
                }
            </div>
            </>
        )
    }
}

export default BlogPost;