export const columns=[
    {
        name:"S No",
        selector: (row) =>row.sno
    },

    {
        name:"name",
        selector: (row) =>row.name
    },

    {
        name:"email",
        selector: (row) =>row.email
    },

    {
        name:"location",
        selector: (row) =>row.location
    },

]
export const SupplierButtons=()=>{
    return(
        <div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}