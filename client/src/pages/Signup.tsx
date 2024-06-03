import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { axiosClient } from "../Utils/axiosClient";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface newError {
  name?: string;
  email?: string;
  password?: string;
}


const Signup: React.FC  = () => {
  
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<newError>({});
  const navigate = useNavigate()

  const isValidEmail = (email:string) => {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password:string) => {
   
    return (
      password.length >= 4 
     
    );
  };


  const validateForm = () => {
    const newErrors: Partial<newError> = {};

        if (!formData.name) {
            newErrors.name = "First name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!isValidPassword(formData.password)) {
            newErrors.password = "password length should be min 4 char";
        }

       
        setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      const res = await axiosClient.post("/users/signup",formData)
      if(res.data.status === "ok"){
        toast.success("user signup successfully")
        navigate("/login")
      }
      else{
        toast(res.data.message)
      }
    } else {
      return 
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className="h-screen w-full flex justify-center ">
    <form onSubmit={handleSubmit} className='w-1/3  p-5 shadow-sm shadow-gray-400 h-fit md:mt-20 '>
       
        <label className="block">
            <span className="block text-sm font-medium text-slate-700">Name</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange}  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
               {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </label>
        <label className="block">
            <span className="block text-sm font-medium text-slate-700">Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange}  autoComplete="on"   className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </label>
        <label className="block">
                    <span className="block text-sm font-medium text-slate-700">Password</span>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="on"  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                            "/>
                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </label>

        <button  className='text-white font-medium px-3 py-1 bg-pink-600 rounded-lg my-2'>signup</button>
     <p className='font-medium'>already have account ? <Link to="/login" className='text-pink-500'>login</Link></p>

    </form>
</div>
  )
}

export default Signup
