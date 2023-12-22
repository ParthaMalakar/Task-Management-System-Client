import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
    const task = useLoaderData();
    const { _id,title,descriptions,deadlines,status,priority} = task;

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const food_name = form.get('name');
        const food_image = form.get('img');
        const food_category = form.get('food_category');
        const quantity = form.get('quantity');
        
     
        const newFood={food_name,food_image,food_category,quantity}

console.log(newFood)
fetch(`http://localhost:5000/task/${_id}`, {
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(newFood)
})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
            Swal.fire({
                title: 'Success!',
                text: 'Task Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }
    })


    }
    return (
        <div>
            <div className="bg-[#698ea5ca]">
                <h2 className="text-3xl  pt-5 text-center font-bold">Update an Task item</h2>
                <form onSubmit={handleUpdate} className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Task Title</span>
                        </label>
                        <input type="text" defaultValue={title}  required name="name" placeholder="Food Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Descriptions</span>
                        </label>
                        <input type="text" defaultValue={descriptions} required name="img" placeholder="Food Image" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Deadlines</span>
                        </label>
                        <input type="date" defaultValue={deadlines}  required name="food_category" placeholder="food_category" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold"> Quantity</span>
                        </label>
                        <input type="text" readOnly defaultValue={priority} required name="quantity" placeholder="Quantity you need" className="input input-bordered" />
                    </div>
                   
                    <div className="form-control mt-6">
                        <button className="btn bg-red-400 text-white font-bold">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;