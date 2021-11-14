import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, StatusBar } from 'react-native'
import ModalView from '../components/ModalView'
import Header from '../components/Header'
import ButtonText from '../components/TextButton'

const HomeScreen = props => {
    const [activeTab, setActiveTab] = useState('Timestamp')
    const [dates, setDates] = useState('Select the dates')

    return (
        <View style={styles.screen} >
            <StatusBar barStyle='dark-content' />
            <Header />
            <Image style={styles.image} source={require('../assets/ilustration_lifestyle.png')} />
            <View style={styles.tabsContainer} >
                <ButtonText title='Timestamp feed' onPress={() => setActiveTab('Timestamp')} active={activeTab === 'Timestamp'} />
                <ButtonText title='Activity feed' onPress={() => setActiveTab('Activity')} active={activeTab === 'Activity'} />
            </View>
            <ModalView
                style={styles.modal}
                onPressApplyButton={(text) => setDates(text)} title={dates}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#CBCBCB'
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
    },
    tabsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        marginTop: 16
    },
    modal: {
        alignSelf: 'center',
        marginTop: 64
    }
})

export default HomeScreen