import  { useContext, useEffect } from 'react';
import { BookContext } from '../../context/BookProvider';
import { DELETE_DATA, SET_DATA } from '../../context/Productprovider';
import { Link } from 'react-router-dom';
import IBook from '../../interface/IBook';

const Listbook = () => {
  const { listbook, dispatchBook } = useContext(BookContext);

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => {
        dispatchBook({ type: SET_DATA, payload: data });
        console.log(data);
        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function deleteHandle(id: string) {
    const confirmDelete = window.confirm("Do you want to delete this book?");
    if (confirmDelete) {
      fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(data => {
          dispatchBook({ type: DELETE_DATA, payload: id });
        })
        .catch(error => console.error('Error deleting book:', error));
    }
  }

  return (
    <div>
      <Link to="/admin/books/add">Add New Books</Link>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Sale</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listbook && listbook.data.map((item: IBook) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.sale}</td>
                <td>{item.category}</td>
                <td>
                  <Link className="btn btn-primary mx-3" to={`/admin/books/edit/${item.id}`}>Edit</Link>
                  <button className="btn btn-success" onClick={() => { deleteHandle(item.id!) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listbook;
