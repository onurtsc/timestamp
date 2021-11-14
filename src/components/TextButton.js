import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const ButtonText = props => {

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress} >
            <Text
                style={{ ...styles.title, color: props.active ? '#383C49' : '#808080' }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CBCBCB'
    },
    title: {
        fontFamily: 'Roboto-Bold',
    },
})

export default ButtonText