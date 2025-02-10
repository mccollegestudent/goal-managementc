import { Card } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[]=[
    {field: 'description', width:90, editable:true,flex:1,},
]

const rows=[
    {description:'Learn Java'},
    {description:'Learn React'},
    {description:'Go for walk'},
    {description:'Learn Java again'}
]
export function TaskTable(){
    return <>
       <Card className="flex-1 rounded-xl shadow-sm">
            <div className="p-5">
                <h1 className="text-lg font-bold">Current Tasks</h1>
            </div>
            <DataGrid 
                rows={rows}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.description}
                sx={{
                    ".MuiDataGrid-columnHeaders": { display: "none" },
                    ".MuiDataGrid-footerContainer": { display: "none" },
                    ".MuiDataGrid-cell": { border: "none" }, 
                }}
            />
        </Card>
    </>
}