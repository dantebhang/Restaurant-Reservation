import React from "react"

function CreateTable(){
    
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
                <button type="button" onClick={handleCancel}>
					Cancel
				</button>
				<button type="submit">Submit</button>
            </form>

        </div>
    );
}

export default CreateTable;