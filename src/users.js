let users = [];
        
        const addUser = (ev)=>{
            ev.preventDefault();
            let user = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                idade: document.getElementById('idade').value
            }
            users.push(user);
            document.forms[0].reset(); // to clear the form for the next entries
            //document.querySelector('form').reset();

            //for display purposes only
            console.warn('added' , {users} );
            let pre = document.querySelector('#msg pre');
            pre.textContent = '\n' + JSON.stringify(users, '\t', 2);

            //saving to localStorage
            localStorage.setItem('MyUsers', JSON.stringify(users) );
        }
        document.addEventListener('DOMContentLoaded', ()=>{
            document.getElementById('btn').addEventListener('click', addUser);
        });
    