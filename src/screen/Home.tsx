import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Pressable, StatusBar } from 'react-native';
import Logo from '../assets/tic.svg'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Home = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreTie, setScoreTie] = useState(0);

  const handleMove = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);

      // Check for a winner or a tie
      const winner = checkWinner(newBoard);
      if (winner) {
        if (winner === 'X') {
          setScoreX(scoreX + 1);
        } else if (winner === 'O') {
          setScoreO(scoreO + 1);
        }
        resetGame();
      } else if (isBoardFull(newBoard)) {
        setScoreTie(scoreTie + 1);
        resetGame();
      } else {
        setPlayer(player === 'X' ? 'O' : 'X');
      }
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
  };

  const renderSquare = (index) => {
    return (
      <Pressable onPress={() => handleMove(index)} style={styles.square}>
        <Text style={styles.value}>{board[index]}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#43115b'} />
      <View style={styles.scoreContainer}>
        <View style={[styles.scoreBox, { backgroundColor: '#48D2FE' }]}>
          <Text style={styles.score}>PLAYER X</Text>
          <Text style={[styles.score, { fontWeight: 'bold', fontSize: responsiveFontSize(6) }]}>{scoreX}</Text>
        </View>
        <View style={[styles.scoreBox, { backgroundColor: '#BCDBF9', }]}>
          <Text style={styles.score}>DRAW</Text>
          <Text style={[styles.score, { fontWeight: 'bold', fontSize: responsiveFontSize(6) }]}>{scoreTie}</Text>
        </View>
        <View style={[styles.scoreBox, { backgroundColor: '#E2BE00' }]}>
          <Text style={styles.score}>PLAYER O</Text>
          <Text style={[styles.score, { fontWeight: 'bold', fontSize: responsiveFontSize(6) }]}>{scoreO}</Text>
        </View>
      </View>

      <View style={{ flex: 3, alignItems:'center' }}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>

      <View style={{ flex: 2 }}>
        <Logo width={responsiveWidth(69)} height={responsiveHeight(32)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43115b',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: responsiveWidth(26),
    height: responsiveHeight(12),
    borderWidth: 7,
    borderRadius: 10,
    borderColor: '#43115b',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#5a1e76'
  },
  value: {
    fontSize: responsiveFontSize(9),
    fontWeight: 'bold',
    color: 'white'
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(3),
  },
  score: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
  },
  scoreBox: {
    width: responsiveWidth(25),
    height: responsiveHeight(12),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;