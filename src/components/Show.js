import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layanan: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('layanan').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          layanan: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('layanan').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/layanan")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/layanan">Layanan List</Link></h4>
            <h3 class="panel-title">
              {this.state.layanan.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Nama:</dt>
              <dd>{this.state.layanan.nama}</dd>
              <dt>Harga:</dt>
              <dd>{this.state.layanan.harga}</dd>
              <dt>Deskripsi:</dt>
              <dd>{this.state.layanan.deskripsi}</dd>
             
              
            </dl>
            {/* <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp; */}
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;