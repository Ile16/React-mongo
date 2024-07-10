import React, { useEffect, useState } from "react";

function Test(){
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [limit, setLimit] = useState(3);
const [user, setUser] = useState([]);
const [newUser, setNewUser] = useState({name:'', email:'', role:'user' });

    useEffect(() => {
        fetch(`http://localhost:5001/api/users?page=${currentPage}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            setUser(data.users),
            setTotalPages(data.totalPages)
        }) //gli utenti sono all'interno di una chiave nel db che sarebbe users
        .catch(error => console.error(error))
    },[]); //chiamata degli elementi in db solo al montaggio e quindi solo una volta
    

    const postUser = (e) => {
        e.preventDefault()
        fetch("http://localhost:5001/api/users", {
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            setUser([...user, data])
            setNewUser({name:'', email:'', role:'user'});
        }) //spread operator per aggiungere l'utente modificando la variabile di stato senza fare un altra get
        .catch(error => console.error(error))
    }

    
const deleteUser = (id) => {
    fetch(`http://localhost:5001/api/users/${id}`, {
            method:'DELETE'
        })
        .then(() => {
            setUser(user.filter((singleUsers)=> singleUsers._id !== id))
        })
        .catch(error => console.error(error))
}

    return (
        <>
        <h1>Gestione degli utenti</h1>
        <form onSubmit={postUser}>
            <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name:e.target.value})} required/>
            <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email:e.target.value})} required/>
            <input type="date" placeholder="Date of Birth" value={newUser.date} onChange={(e) => setNewUser({...newUser, date:e.target.value})} />
            <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role:e.target.value})} required>
                <option value="user">User</option>
                <option value="Admin">Admin</option>
            </select>
            <button type="submit">Crea</button>
        </form>

        <button>
            Back
        </button>
        <span>
            {currentPage}/{totalPages}
        </span>
        <button>
            Next
        </button>
        <select name="" id="" value={limit} onChange={(e) => setLimit(Number(e.target.value))}/>
        <option value={5}></option>
        <option value={10}></option>
        <option value={20}></option>
        <ul>
            {
                user.map((singleUsers) => (
                    <li key={singleUsers._id}>
                        <h4>{singleUsers.name}</h4>
                        <h4>{singleUsers.email}</h4>
                        <h4>{singleUsers.role}</h4>
                        <button onClick={(() => deleteUser(singleUsers._id))}>Delete</button>
                    </li>
                ))

            }
        </ul>

        </>
    )
}

export default Test