import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toJS } from 'mobx'
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import HeaderAppBar from '../main/headerAppBar';
import Store from "../dataStores/meetings"

const theme = createTheme();

export default function MeetingsDetails({ isAdmin, setIsAdmin }) {
    let m = toJS(Store.meetings);
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        const fetchMeetingsData = async () => {
            const mappedRows = []
            m?.forEach((mit) => {
                mappedRows.push({ ...mit })
            })
            setRows(mappedRows);
        };
        fetchMeetingsData();
    }, [m]);

    useEffect(() => {
        if (rows.length > 0) {
            const sortedRows = [...rows].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
            setRows(sortedRows);
        }
    }, [rows]);

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'serviceName',
            headerName: 'SERVICE NAME',
            width: 150,
            editable: true,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'serviceDescription',
            headerName: 'SERVICE DESCRIPTION',
            width: 200,
            editable: true,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'servicePrice',
            headerName: 'SERVICE PRICE',
            type: 'number',
            align: 'center',
            width: 150,
            editable: true,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'dateTime',
            headerName: 'DATE TIME',
            type: 'Date',
            width: 200,
            editable: true,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',

        },
        {
            field: 'clientName',
            headerName: 'CLIENT NAME',
            width: 150,
            editable: true,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
        }, {
            field: 'clientPhone',
            headerName: 'CLIENT PHONE',
            width: 120,
            align: 'center',
            editable: true,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
        }, {
            field: 'clientEmail',
            headerName: 'CLIENT EMAIL',
            width: 200,
            align: 'center',
            editable: true,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
        }
    ]
    const getRowId = (row) => row.id;

    const getRowClassName = (params) => {
        const rowDate = new Date(params.row.dateTime).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        const thisWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);

        if (rowDate === today) {
            return 'today-row';
        } else if (rowDate >= thisWeek) {
            return 'this-week-row';
        }
        return 'simple-row';
    };

    return (
        <>
            <HeaderAppBar isAdmin={isAdmin} setIsAdmin={setIsAdmin}></HeaderAppBar>
            <ThemeProvider theme={theme}  >
                {
                    <>
                        {isAdmin && <>
                            <Box sx={{
                                height: 800, width: '76.5%', ml: 23, mt: 18, backgroundColor: 'white',
                            }}>
                                <Typography variant="h2" sx={{ mb: 5 }}>Meetings</Typography>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    getRowId={getRowId}
                                    getRowClassName={getRowClassName}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                    sx={{
                                        boxShadow: 2,
                                        border: 4,
                                        height: 400,
                                        width: '100%',
                                        '& .super-app-theme--header': {
                                            backgroundColor: 'rgba(25, 7, 0, 0.55)',
                                            fontSize: 15,
                                            fontWeight: 'bolder',
                                            color: 'white'
                                        },
                                        '& .this-week-row': {
                                            backgroundColor: 'pink',
                                        },
                                        '& .today-row': {
                                            backgroundColor: 'rgba(255, 7, 0, 0.55)',
                                        },
                                        '& .simple-row': {
                                            backgroundColor: 'hsl(0, 0%, 90%)',
                                        },
                                    }}
                                />
                                <div>
                                    <br></br>
                                    <span style={{ backgroundColor: 'hsl(0, 0%, 90%)', padding: '4px', marginRight: '10px' }}></span>
                                    All Meetings
                                    <span style={{ backgroundColor: 'rgba(255, 7, 0, 0.55)', padding: '4px', marginRight: '10px', marginLeft: '20px' }}></span>
                                    Meetings for today
                                    <span style={{ backgroundColor: 'pink', padding: '4px', marginRight: '10px', marginLeft: '20px' }}></span>
                                    Meetings for this week                    
                                </div>
                            </Box></>}
                    </>
                }
            </ThemeProvider>
        </>
    );
}