import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const AddVolunteer = () => {
    const [deadline, setDeadline] = useState(null);
    const{user,setLoading}=useContext(AuthContext);

    const handleSubmit=(e)=>{
        e.preventDefault();

        const thumbnail = e.target.thumbnail.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const numOfvolunteer = e.target.numOfvolunteer.value;
        const deadlineDate = e.target.deadlineDate.value;
        const email = e.target.email.value;

        const newVolunteer = { thumbnail, title, description, category, location, numOfvolunteer, deadlineDate, email };

        setLoading(true);
        fetch('https://volunteer-hub-server-ten.vercel.app/addvolunteer',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(newVolunteer),
        })

        .then((res)=>res.json())
        .then((data)=>{
            setLoading(false);
            if (data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Volunteer need post Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                });
                e.target.reset();    
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add . Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }); 
            }
        })
        .catch((error)=>{
            setLoading(false);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while adding the volunteer.',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.error(error);

        })
    }

    return (
        <div className='lg:w-3/4 mx-auto mt-16 mb-10'>
            <div className="text-center p-10">
                <h1 className="text-5xl font-bold">Add Volunteer!</h1>

            </div>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Thumbnail </span>
                            </label>
                            <input type="text" name='thumbnail' placeholder="URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Post Title</span>
                            </label>
                            <input type="text" name='title' placeholder="Title" className="input input-bordered" required />
                        </div>
                    </div>
                    {/* form second row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="text" name='description' placeholder="Description" className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Category </span>
                            </label>
                            <select
                                name="category"
                                className="select select-bordered"
                                required
                            >
                                <option value="" disabled selected>
                                    Select a category
                                </option>
                                <option value="healthcare">healthcare</option>
                                <option value="education">education</option>
                                <option value="social service">social service</option>
                                <option value="animal welfare">animal welfare</option>

                            </select>
                        </div>
                    </div>
                    {/* form third row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Location </span>
                            </label>
                            <input type="text" name='location' placeholder="Location " className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">No. of volunteers needed</span>
                            </label>
                            <input type="number" name='numOfvolunteer' placeholder="Num of volunteer" className="input input-bordered" required />
                        </div>
                    </div>



                    {/* form fourth row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Deadline</span>
                            </label>
                            <DatePicker
                                 
                                selected={deadline}
                                onChange={(date) => setDeadline(date)}
                                className="input w-full input-bordered"
                                name='deadlineDate'
                                placeholderText="Select deadline"
                                dateFormat="dd/MM/yyyy"
                                required
                            />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold">Organizer email</span>
                            </label>
                            <input
                                readOnly
                                type="text"
                                name="email"
                                defaultValue={user && user.email}
                                placeholder="Name"
                                className="input input-bordered"
                                required
                            />
                        </div>

                    </div>



                    
                    <div className="form-control mt-6">
                        <button className="btn btn-neutral">Add Post</button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddVolunteer;