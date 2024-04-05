import { SyntheticEvent, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import TextField from "../components/ui/TextField";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";

const Update = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrentUserEmail = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setEmail(data.email);
        } else {
          throw new Error('Failed to fetch current user data');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch current user data');
      }
    };

    fetchCurrentUserEmail();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email) {
      if (!email) {
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
      return;
    }

    const response = await fetch('http://localhost:8000/api/user/update/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
          email,
      })
    });

    if (response.ok) {
      toast.success("Update Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setError('This email address is already registered.');
    }
  }

  return (
    <>
      <Navbar />
      <div className="App">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Update User</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submit}>
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

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
