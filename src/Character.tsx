import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginRight: '24px',
        marginBottom: '24px'
    }
});

interface Character {
    name: string;
    imageUrl: string;
    species: string;
    status: string;
}

const Character = ({ name, imageUrl, species, status }: Character) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={name}
                    image={imageUrl}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom={true} variant="subtitle1" component="p">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                     species: {species}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     status: {status}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Character;
