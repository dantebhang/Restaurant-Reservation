import React from "react"

function CreateTable({
    handleCancel, 
    handleSubmit, 
    table, 
    setTable,
}){

    const handleChange = ({ target }) => {
        setTable({
            ...table, 
            [target.name]: target.value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        table.capacity = Number(table.capacity);
        handleSubmit(table);
    }
    
    return(
        <div>
            
            <form onSubmit={onSubmit}>
                <label htmlFor="table_name">
                    Table name
                    <input 
                        id="table_name"
                        type="text"
                        name="table_name"
                        min={"2"}
                        onChange={handleChange}
                        value={table.table_name}
                        required
                        />
                </label>
                <br />
                <label htmlFor="capacity">
                    Capacity
                    <input 
                        id="capacity"
                        type="number"
                        name="capacity"
                        min={"1"}
                        onChange={handleChange}
                        value={table.capacity}
                        required
                        />
                </label>
                <br />
                <button class="btn btn-secondary mr-2 cancel" type="button" onClick={handleCancel}>
					Cancel
				</button>
				<button class ="btn btn-primary" type="submit">Submit</button>
            </form>

        </div>
    );
}

export default CreateTable;