import { styled } from "styletron-react";

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';

export const Wrapper = styled(Paper, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#efefef !important',
});

export const CardWrapper = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
});

export const KekroesList = styled(List, {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    margin: '15px 0 !important',
    background: '#fff',
});

export const KekroSlot = styled(Card, {
    width: '30%',
});