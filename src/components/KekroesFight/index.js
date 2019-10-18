import React from 'react';

import { connect } from 'react-redux'

import * as Styles from './styles';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

class KekroesFight extends React.PureComponent {
    state = {
        hero1: null,
        hero2: null,
        fightResult: '',
        fightLog: [],
    }

    showHeroStats = hero => {
        return (<span>{hero.stats}</span>);
    }
    
    selectHero = hero => {
        if (!this.state.hero1) {
            this.setState({hero1: hero});
        } else if (this.state.hero1 === hero && this.state.hero2 === null) {
            return;
        } else if (this.state.hero1 === hero) {
            this.setState({hero1: this.state.hero2, hero2: hero});
        } else {
            this.setState({hero2: hero});
        }
    }

    FIGHT = (hero1, hero2) => {

        const hero1Copy = {...hero1};
        const hero2Copy = {...hero2};

        const fightLog = [];

        while (hero1Copy.hp > 0 && hero2Copy.hp > 0) {
            fightLog.push(this.round(hero1Copy, hero2Copy));   
        }

        if (hero1Copy.hp <= 0 && hero2Copy.hp <= 0) {
            this.setState({fightResult: 'The guys went draw!', fightLog});
            return;
        }

        if (hero2Copy.hp <= 0) {
            this.setState({fightResult: `The winner is: ${hero1.name}, HP left: ${hero1Copy.hp}!`, fightLog});
        } else if (hero1Copy.hp <= 0) {
            this.setState({fightResult: `The winner is: ${hero2.name}, HP left: ${hero2Copy.hp}!`, fightLog});
        }
    }

    round = (hero1, hero2) => {

        const roundLog = [];

        const getRandomAttack = hero => Math.floor(Math.random() * hero.stats.attack);
        const getRandomDefense = hero => Math.floor(Math.random() * hero.stats.defense);
        const getMagicArrowDamage = hero => hero.stats.spellPower * 1;
        const getChanceToCast = hero => hero.stats.knowledge === 0 
                                ? false 
                                : Math.floor(Math.random() * 9  ) < hero.stats.knowledge;

        let hero1ChangeByWeapon = getRandomAttack(hero2) - getRandomDefense(hero1);
        
        let hero2ChangeByWeapon = getRandomAttack(hero1) - getRandomDefense(hero2);
        
        let hero1ChangeBySpell = getChanceToCast(hero2) ? getMagicArrowDamage(hero2) : 0;
        let hero2ChangeBySpell = getChanceToCast(hero1) ? getMagicArrowDamage(hero1) : 0;

        hero1ChangeByWeapon = hero1ChangeByWeapon > 0 ? hero1ChangeByWeapon : 0;
        hero2ChangeByWeapon = hero2ChangeByWeapon > 0 ? hero2ChangeByWeapon : 0;
    
        hero1.hp = hero1.hp - hero1ChangeByWeapon - hero1ChangeBySpell;
        hero2.hp = hero2.hp - hero2ChangeByWeapon - hero2ChangeBySpell;

        roundLog.push(`${hero1.name} took ${hero1ChangeByWeapon} damage by weapon and ${hero1ChangeBySpell} by spell and had ${hero1.hp} HP left ---`);
        roundLog.push(`${hero2.name} took ${hero2ChangeByWeapon} damage by weapon and ${hero2ChangeBySpell} by spell and had ${hero2.hp} HP left`);

        return roundLog;
    }

    render() {

        const { heroes } = this.props;

        const {hero1, hero2, fightResult, fightLog} = this.state;

        return (
            <Styles.Wrapper>
                <Styles.KekroesList>
                    {
                        heroes.map((hero, i) => <React.Fragment key={i}><ListItem button onClick={() => this.selectHero(hero)}>{hero.name}</ListItem><Divider /></React.Fragment>)
                    }                        
                </Styles.KekroesList>
                <Styles.CardWrapper>
                    <Styles.KekroSlot>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Champion 1
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {hero1 && hero1.name}
                            </Typography>
                            <Typography color="textSecondary">
                            {hero1 && hero1.race}
                            </Typography>
                            <Typography variant="body2" component="p">
                            HP: {hero1 && hero1.hp}<br/>
                            Attack: {hero1 && hero1.stats.attack}<br/>
                            Defense: {hero1 && hero1.stats.defense}<br/>
                            Spell Power: {hero1 && hero1.stats.spellPower}<br/>
                            Knowledge: {hero1 && hero1.stats.knowledge}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">More Info</Button>
                        </CardActions>
                    </Styles.KekroSlot>
                    <Styles.KekroSlot>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            Champion 2
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {hero2 && hero2.name}
                            </Typography>
                            <Typography color="textSecondary">
                            {hero2 && hero2.race}
                            </Typography>
                            <Typography variant="body2" component="p">
                            HP: {hero2 && hero2.hp}<br/>
                            Attack: {hero2 && hero2.stats.attack}<br/>
                            Defense: {hero2 && hero2.stats.defense}<br/>
                            Spell Power: {hero2 && hero2.stats.spellPower}<br/>
                            Knowledge: {hero2 && hero2.stats.knowledge}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">More Info</Button>
                        </CardActions>
                    </Styles.KekroSlot>
                </Styles.CardWrapper>
                {hero1 && hero2 !== null ? <Button variant="contained" color="secondary" onClick={() => this.FIGHT(hero1, hero2)}>FIGHT</Button> : null}<br/>
                {fightResult.length > 0 ? <span>{fightResult}</span> : null}
                {fightLog.length > 0 ? <div>{fightLog.map((round, i) => <div key={i}>{round.map(line => line+' ')}</div>)}</div> : null}
            </Styles.Wrapper>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      heroes: state.heroesReducer.heroes,
    }
  }

export default connect(
    mapStateToProps,
    null
  )(KekroesFight)