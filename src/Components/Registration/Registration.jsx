import { Link } from "react-router-dom";
import { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/Authprovider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";


const Registration = () => {
    const {createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    


    const handleRegistration = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        console.log(name, photo, email, password);

        if (password.length < 6) {
            Swal.fire({
                title: 'Password should be at least 6 characters or longer!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            return;
        }
        else if (!/[A-Z]/.test(password)) {
    
            Swal.fire({
                title: 'Your password should have at least one upper case characters!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })

            return;
        }
        else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            
            Swal.fire({
                title: 'Password must contain at least one special characters',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                const Myorder = [];
                const userdata = { email, Myorder: Myorder };
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userdata)
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.insertedId){
                            console.log('user added to the database')
                        }
                        
                    })

                updateProfile(user, {
                    displayName: name , 
                    photoURL: photo , 
                  }).then(() => {
                    console.log("User profile updated");
                    window.location.reload(true)
                  }).catch((error) => {
                    console.error("Error updating profile:", error);
                  });
                
                  Swal.fire(
                    'Registration Successfully complete',
                    'You clicked the button!',
                    'success'
                  )
                  e.target.reset();
                  navigate(location?.state ? location.state : '/');
                  
                            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: `${error.message}`,
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            })
        }
    return (
        <div>
          
             <div className="bg-[#837b799f]">
                <h2 className="text-3xl pt-8 text-center font-bold">Please Register</h2>
                <form onSubmit={handleRegistration}  className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type="text" required name="name" placeholder="Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo URL</span>
                        </label>
                        <input type="text" required name="photo" placeholder="Photo URL" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type="email" required name="email" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" required name="password" placeholder="Password" className="input input-bordered" />
                        
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-red-400 text-white font-bold">Register</button>
                    </div>
                </form>
                
                <p className="text-center mt-4 font-bold text-lg pb-6  ">Already have an account? <Link className="text-blue-600 font-bold" to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Registration;