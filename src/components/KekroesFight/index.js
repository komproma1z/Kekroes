import React from 'react';

import { connect } from 'react-redux'

import * as Styles from './styles';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const winrateCache = [[], []];
const getFromCache = (hero1, hero2) => {
    for (let i = 0; i < winrateCache[0].length; i++) {
        if (winrateCache[0][i].includes(hero1.name) && winrateCache[0][i].includes(hero2.name)) {
            if (winrateCache[0][i][0] === hero1.name) {
                return {1: winrateCache[1][i][1], 2: winrateCache[1][i][2]}
            } else {
                return {2: winrateCache[1][i][1], 1: winrateCache[1][i][2]}
            }
        }
    }
}
const setToCache = (hero1, hero2, value) => {
    winrateCache[0].push([hero1.name, hero2.name]);
    winrateCache[1].push(value);
}
const PREDICTION_PRECISION = 10000;
class KekroesFight extends React.PureComponent {
    state = {
        hero1: null,
        hero2: null,
        fightResult: '',
        fightLog: [],
    }

    winrateCache = [];

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

    _fightCalculate = (hero1, hero2) => {
        const hero1Copy = {...hero1};
        const hero2Copy = {...hero2};

        const fightLog = [];

        while (hero1Copy.hp > 0 && hero2Copy.hp > 0) {
            fightLog.push(this.round(hero1Copy, hero2Copy));   
        }

        return [hero1Copy.hp, hero2Copy.hp, fightLog]
    }
    FIGHT = (hero1, hero2) => {

        const [hero1hp, hero2hp, fightLog] = this._fightCalculate(hero1, hero2);
        if (hero1hp <= 0) {
            this.setState({fightResult: `The winner is: ${hero1.name}, HP left: ${hero1.hp}!`, fightLog});
        } else if (hero2hp <= 0) {
            this.setState({fightResult: `The winner is: ${hero2.name}, HP left: ${hero2.hp}!`, fightLog});
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
    _roundAttack = (hero1, hero2) => {
        
    }

    predict = (hero1, hero2) => {
        if (!getFromCache(hero1, hero2)) {
            const fights = [];
            for (let i = 0; i < PREDICTION_PRECISION; i++) {
                fights.push(this._fightCalculate(hero1, hero2));
            }
            const wins = fights.reduce((acc, next) => {
                if (next[0] > 0 && next[1] <= 0) {
                    acc[1] += 1;
                } else if (next[1] > 0 && next[0] <= 0) {
                    acc[2] += 1;
                }
                return acc;
            }, {1: 0, 2: 0});
            setToCache(hero1, hero2, wins);
        }
        
        return getFromCache(hero1, hero2);
    }

    render() {

        const { heroes } = this.props;

        const {hero1, hero2, fightResult, fightLog} = this.state;
        let wins;
        if (hero1 && hero2) {
            wins = this.predict(hero1, hero2);
        }
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
                            Champion 1 {wins ? `${(wins[1] / PREDICTION_PRECISION * 100).toFixed(2)}%` : null}
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
                            Champion 2 {wins ? `${(wins[2] / PREDICTION_PRECISION * 100).toFixed(2)}%` : null}
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