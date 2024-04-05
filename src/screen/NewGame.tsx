import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import NewGameButton from '../assets/newgame.svg'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Logo from '../assets/tic.svg'

const { height } = Dimensions.get('screen')

const ANGLE = 2;
const TIME = 100;
const EASING = Easing.elastic(1.5);

const NewGame = ({ navigation }: any) => {
    const rotation = useSharedValue(0);
    const animatedValue = useSharedValue(responsiveHeight(80));
    const animatedStyleLogo = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: animatedValue.value,
          },
        ],
      };
    });
  
    useEffect(() => {
      setTimeout(() => {
        animatedValue.value = withTiming(responsiveHeight(3), { duration: 2000 }); // Animate the logo to fall from the top to the bottom
      }, 2000)
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotateZ: `${rotation.value}deg` }],
    }));
  
    const handlePress = () => {
      rotation.value = withSequence(
        // deviate left to start from -ANGLE
        withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
        // wobble between -ANGLE and ANGLE 7 times
        withRepeat(
          withTiming(ANGLE, {
            duration: TIME,
            easing: EASING,
          }),
          7,
          true
        ),
        // go back to 0 at the end
        withTiming(0, { duration: TIME / 2, easing: EASING })
      );

      setTimeout(() => {
        navigation.navigate("Home")
      }, 1000)
    };

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#5A1E76"} />
        <Animated.View style={[animatedStyleLogo]}>
          <Logo width={responsiveWidth(40)} height={responsiveHeight(15)} />
        </Animated.View>

        <Animated.View style={[animatedStyle]} >
          <TouchableOpacity onPress={handlePress}>
            <NewGameButton width={300} height={300} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#5A1E76'
    }
})

export default NewGame