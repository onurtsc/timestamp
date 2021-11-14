import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const Header = props => {
    return (
        <View style={styles.container} >
            <View style={styles.left} >
                <Image style={styles.userImage} source={require('../assets/user.jpg')} />
                <View style={styles.sandwich}>
                    <Image style={styles.sandwichBackground} source={require('../assets/sandwich-background.png')}/>
                    <View style={styles.sandwichLine} />
                    <View style={styles.sandwichLine} />
                    <View style={styles.sandwichLine} />
                </View>
            </View>
            <View style={styles.middle} >
                <Text style={styles.titleText} >R </Text>
                <View style={styles.letter} >
                    <View style={{ ...styles.letterLine, backgroundColor: '#4a54df' }} />
                    <View style={{ ...styles.letterLine, backgroundColor: '#6684BA' }} />
                    <View style={{ ...styles.letterLine, backgroundColor: '#15d4d8' }} />
                </View>
                <Text style={styles.titleText} > L O A D</Text>
            </View>
            <View style={styles.right} >
                <Image style={styles.chatIcon} source={require('../assets/chat_icon3x.png')} />
                <View style={styles.dot} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#CBCBCB'
    },
    left: {
        width: '20%',
    },
    middle: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    right: {
        width: '20%',
        alignItems: 'flex-end'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover',
    },
    chatIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: 'cover',
    },
    titleText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular'
    },
    letter: {
        height: 10,
        paddingHorizontal: 2,
        justifyContent: 'space-between',
        fontFamily: 'Roboto-Regular'
    },
    letterLine: {
        width: 10,
        height: 2,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF6961',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    sandwich: {
        width: 20,
        height: 20,
        borderRadius: 10,
        paddingVertical: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        right: 20,
        resizeMode: 'cover'
    },
    sandwichBackground: {
        resizeMode: 'cover',
        width: 20,
        height: 20,
        borderRadius: 10,
        zIndex: 0,
        position: 'absolute'
    },
    sandwichLine: {
        width: 10,
        height: 1.1,
        backgroundColor: 'white',
        zIndex: 99,
    },
})

export default Header