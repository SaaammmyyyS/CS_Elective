import React, {SyntheticEvent, useState} from 'react';
import Navbar from '../components/navbar';
import TextField from '../components/ui/TextField';
import Button from '../components/ui/Button';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warning("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters long.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    toast.success("Register Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setRedirect(true);
  }


  return (
    <><Navbar></Navbar>
    <div className="App">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <div className="mt-2">
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  name="email"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  name="password"
                />
              </div>
            </div>
            <div>
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </div>
      </div>
    </div></>
  );
}

export default Register;
