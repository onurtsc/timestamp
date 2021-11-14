import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Animated } from 'react-native'
import ButtonBox from './ButtonBox'
import Calendar from './Calendar'
import CustomIcon from './CustomIcon'

const SCROLL_DISTANCE = 500
const CONTENT_MAX_HEIGHT = 500
const CONTENT_MIN_HEIGHT = 100

const ModalView = props => {
    const [modalVisible, setModalVisible] = useState(false)
    const [text, setText] = useState(false)
    const [error, setError] = useState('')

    const scrollY = new Animated.Value(CONTENT_MAX_HEIGHT)

    const contentHeight = scrollY.interpolate({
        inputRange: [0, SCROLL_DISTANCE],
        outputRange: [CONTENT_MIN_HEIGHT, CONTENT_MAX_HEIGHT],
        extrapolate: 'clamp'
    })

    const datesHandler = (sDay, fDay) => {
        if (!sDay || !fDay) {
            return
        } else {
            const t = sDay + ' - ' + fDay + ' August 2021'
            setText(t)
        }
    }

    const buttonHandler = () => {
        if (text) {
            props.onPressApplyButton(text)
            setModalVisible(false)
        } else {
            setError('Two days must be selected!')
        }
    }

    return (
        <View style={{ ...props.style, width: '100%' }} >
            <TouchableOpacity style={styles.titleContainer} onPress={() => { setModalVisible(true) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <CustomIcon name='calendar' />
                    <Text style={styles.label} >Period: </Text>
                </View>
                <Text style={styles.value} >{props.title}</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType='fade' transparent={true} >
                <View style={styles.background} >

                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            ...styles.container,
                            height: 1000,
                        }}
                        style={{
                            height: contentHeight,
                            width: '100%',
                            position: 'absolute',
                            bottom: 0,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                        // bounces={0}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        onScrollEndDrag={() => { setModalVisible(false) }}
                    >
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image style={styles.closeImage} source={require('../assets/close.png')} />
                            </TouchableOpacity>
                            <Text style={styles.title} >Calendar</Text>
                            {error !== '' && <Text style={styles.error} >{error}</Text>}
                        </View>
                        <Calendar onPressDates={datesHandler} />
                        <ButtonBox title='Apply' onPress={buttonHandler} />
                    </Animated.ScrollView>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    closeImage: {
        width: 16,
        height: 16,
        resizeMode: 'cover',
        marginRight: 20
    },
    label: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#383C49',
        marginLeft: 10
    },
    error: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'tomato',
        marginLeft: 10,
        position: 'absolute',
        right: 10,
    },
    value: {
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
        color: '#383C49',
        marginLeft: 10
    },
    closeText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20
    },
})

export default ModalView