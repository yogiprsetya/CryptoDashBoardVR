import React from 'react';
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';
import Entity from 'Entity';

export default class CryptoModel extends React.Component {
  render() {
    return (
      <View>
        <Entity
          style={{transform: [{scaleX: 1}, {scaleY: 1}, {scaleZ: 1}, {rotateX: 90}]}}
          source={{obj: asset('models/BTC.obj')}}
        />
      </View>
    );
  }
};

class LeftPanel extends React.Component {
  state = {
    cryptoCurrency: {
      open: '',
      close: '',
      high: '',
      low: '',
      volumefrom: '',
      volumeto: ''
    }
  }

  componentDidMount() {
    fetch('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD')
    .then(res => res.json())
    .then(data => {
      this.setState({
        cryptoCurrency: {
          open: data.Data[30].open,
          close: data.Data[30].close,
          high: data.Data[30].high,
          low: data.Data[30].low,
          volumefrom: data.Data[30].volumefrom,
          volumeto: data.Data[30].volumeto
        }
      })
    })
  }

  render() {
    const { open, close, high, low, volumefrom, volumeto } = this.state.cryptoCurrency;

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.textSize}>Crypto</Text>
        </View>

        <View style={styles.header}>
          <Text>Price Statistics</Text>
          <Text>Open: { open }</Text>
          <Text>Close: { close }</Text>
          <Text>High: { high }</Text>
          <Text>Low: { low }</Text>
          <Text>Volume From: { volumefrom }</Text>
          <Text>Volume To: { volumeto }</Text>
        </View>
      </View>
    )
  }
}

class RightPanel extends React.Component {
  state = {
    cryptoData: {
      symbol: '',
      algorithm: '',
      proofType: '',
      blockNumber: '',
      blockTime: '',
      blockReward: ''
    }
  }
  componentDidMount() {
    fetch('https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=BTC&tsym=USD&&api_key=8face5d6ceacd100aaa744de9165d6324c1cd9fa387be3bfd2cffc7c1a2476ef')
    .then(res => res.json())
    .then(data => {
      this.setState({
        cryptoData: {
          symbol: data.Data[0].CoinInfo.Name,
          algorithm: data.Data[0].CoinInfo.Algorithm,
          proofType: data.Data[0].CoinInfo.ProofType,
          blockNumber: data.Data[0].CoinInfo.BlockNumber,
          blockTime: data.Data[0].CoinInfo.BlockTime,
          blockReward: data.Data[0].CoinInfo.BlockReward,
        }
      })
    })
  }
  render() {
    const { symbol, algorithm, proofType, blockNumber, blockTime, blockReward } = this.state.cryptoData;

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.textSize}>Information</Text>
        </View>

        <View>
          <Text>Symbol: { symbol }</Text>
          <Text>Algorithm: { algorithm }</Text>
          <Text>Proof Type: { proofType }</Text>
          <Text>Block Number: { blockNumber }</Text>
          <Text>Block Time: { blockTime }</Text>
          <Text>Block Reward: { blockReward }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 600,
    backgroundColor: '#00171F',
    borderColor: '#003459',
    borderWidth: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10
  },
  header: {
    backgroundColor: '#003459'
  },
  textSize: {
    fontSize: 30,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('LeftPanel', () => LeftPanel);
AppRegistry.registerComponent('RightPanel', () => RightPanel);
AppRegistry.registerComponent('CryptoModel', () => CryptoModel);