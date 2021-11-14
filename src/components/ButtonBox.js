import React from 'react'
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native'

const ButtonBox = props => {

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress} >
            {/* <ImageBackground style={styles.background} resizeMode='cover' source={require('../assets/button-linear-background.png')} > */}
            <Image style={styles.background} source={require('../assets/button-linear-background.png')} />
            <Text
                style={styles.title}>
                {props.title}
            </Text>
            {/* </ImageBackground> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    background: {
        resizeMode: 'cover',
        width: 300,
        height: 50,
        borderRadius: 25,
        zIndex: 0,
        position: 'absolute'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        zIndex: 99,
    },
})

export default ButtonBox