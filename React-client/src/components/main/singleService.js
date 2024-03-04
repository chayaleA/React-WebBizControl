import React from "react";
import { Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export default function SingleService(props) {
    const { id, name, description,serviceMedia, price, duration, arrPictures } = props;
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    return (<>
        <Grid key={id} item xs={12} sm={6} md={4} lg={3} sx={{ ml: 13, mb: 5, }} >
            <Card sx={{ maxWidth: 345, border: '2px solid #ccc', borderRadius: '8px' }}>
                <CardHeader title={name} />
                <CardContent>
                    {description && <Typography>Description: {description}</Typography>}
                    {duration && <Typography>Duration: {duration} minutes</Typography>}
                    {price && <Typography>Price: {price}</Typography>}
                </CardContent>
                {serviceMedia && <CardMedia
                    component="img"
                    height="194"
                    image={serviceMedia}
                    alt={description}
                    sx={{ mb: 5 }}
                />}

                <React.Fragment>
                    <Button onClick={handleClickOpen('paper')} variant="outlined" sx={{ mb: 5 }}>
                        Viewing a portfolio
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogActions>
                            <Button onClick={handleClose}>
                                <ClearIcon></ClearIcon>
                            </Button>
                        </DialogActions>
                        <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                    {arrPictures?.map((item) => (
                                        <ImageListItem key={item.img}>
                                            <img
                                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                                alt={item.title ? item.title : ""}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>
                <Paper elevation={24} />
                <Paper />
                <Paper elevation={16} />
            </Card>
        </Grid >
    </>)
}

