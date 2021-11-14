import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const horizontalPadding = 10
const dayWidth = (deviceWidth - horizontalPadding * 2) / 7
const imageHeight = dayWidth / 2

const secondRowTop = imageHeight / 2 + 1 * (imageHeight * 2)
const thirdRowTop = imageHeight / 2 + 2 * (imageHeight * 2)
const fourthRowTop = imageHeight / 2 + 3 * (imageHeight * 2)

const Calendar = props => {
    const [startDate, setStartDate] = useState(null)
    const [finishDate, setFinishDate] = useState(null)
    const [imageWidth, setImageWidth] = useState(imageHeight)
    const [imageLeftPosition, setImageLeftPosition] = useState(0)
    const [imageTopPosition, setImageTopPosition] = useState(0)

    const [LastImageTopPosition, setLastImageTopPosition] = useState(0)
    const [lastImageWidth, setLastImageWidth] = useState(0)

    const [secondRow, setSecondRow] = useState(false)
    const [thirdRow, setThirdRow] = useState(false)
    const [fourthRow, setFourthRow] = useState(false)

    useEffect(() => {
        const left = dayWidth * (startDate % 7) - horizontalPadding * 2
        setImageLeftPosition(left)

        const top = imageHeight / 2 + Math.floor(startDate / 7) * (imageHeight * 2)
        setImageTopPosition(top)

        const width = (finishDate - startDate) * dayWidth
        setImageWidth(width)
    }, [startDate, finishDate])

    useEffect(() => {
        const difference = Math.floor(finishDate / 7) - Math.floor(startDate / 7)
        if (difference > 0) {
            let top = imageHeight / 2 + (Math.floor(startDate / 7) + difference) * (imageHeight * 2)
            setLastImageTopPosition(top)

            let width = (finishDate % 7) * dayWidth - horizontalPadding * 2
            setLastImageWidth(width)

            if (finishDate % 7 === 0 && Math.floor(finishDate / 7) > 1) {
                width = 7 * dayWidth - horizontalPadding * 2
                setLastImageWidth(width)

                let top = imageHeight / 2 + (Math.floor(startDate / 7) + difference - 1) * (imageHeight * 2)
                setLastImageTopPosition(top)
            }
        }
    }, [startDate, finishDate])

    useEffect(() => {
        const startDatePosition = Math.floor(startDate / 7)
        const finishDatePosition = Math.floor(finishDate / 7)

        setSecondRow(startDatePosition < 1 && finishDatePosition > 1 ? true : false)
        setThirdRow(startDatePosition < 2 && finishDatePosition > 2 ? true : false)
        setFourthRow(startDatePosition < 3 && finishDatePosition > 3 ? true : false)
    }, [startDate, finishDate, secondRow, thirdRow, fourthRow])

    const dateSelectionHandler = (date) => {
        if (!startDate && !finishDate) {
            setStartDate(date)
            props.onPressDates(date, null)
        }
        if (startDate && !finishDate) {
            if (date === startDate) {
                setStartDate(null)
                props.onPressDates(null, null)
            } else {
                if (date > startDate) {
                    setFinishDate(date)
                    props.onPressDates(startDate, date)
                } else {
                    setFinishDate(startDate)
                    setStartDate(date)
                    props.onPressDates(date, startDate)
                }
            }
        }
        if (startDate && finishDate) {
            if (date === startDate) {
                setStartDate(finishDate)
                setFinishDate(null)
                setLastImageWidth(0)
                props.onPressDates(finishDate, null)
            }
            if (date === finishDate) {
                setFinishDate(null)
                setLastImageWidth(0)
                props.onPressDates(startDate, null)
            }
            if (date !== startDate && date !== finishDate) {
                if (date > startDate) {
                    setFinishDate(date)
                    setLastImageWidth(0)
                    props.onPressDates(startDate, date)
                } else {
                    setFinishDate(startDate)
                    setStartDate(date)
                    setLastImageWidth(0)
                    props.onPressDates(date, startDate)
                }
            }
        }
    }

    const firstDay = startDate ? startDate : ''
    const lastDay = finishDate ? ' - ' + finishDate : ''

    return (
        <View style={styles.container} >
            <View style={styles.titleContainer} >
                <TouchableOpacity onPress={() => console.log('Sorry... July does not exists')}>
                    <Image style={styles.icon} source={require('../assets/arrow-left.png')} />
                </TouchableOpacity>
                <Text style={styles.month}>{firstDay + lastDay } August 2021</Text>
                <TouchableOpacity onPress={() => console.log('Sorry... September does not exists')}>
                    <Image style={styles.icon} source={require('../assets/arrow-right.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.days} >
                <Text style={styles.dayLetter}>S</Text>
                <Text style={styles.dayLetter}>M</Text>
                <Text style={styles.dayLetter}>T</Text>
                <Text style={styles.dayLetter}>W</Text>
                <Text style={styles.dayLetter}>T</Text>
                <Text style={styles.dayLetter}>F</Text>
                <Text style={styles.dayLetter}>S</Text>
            </View>
            <View style={styles.listsContainer}>
                <Image
                    style={{
                        height: imageHeight,
                        position: 'absolute',
                        width: imageWidth,
                        top: imageTopPosition,
                        left: imageLeftPosition
                    }}
                    source={require('../assets/calendar-linear-background.png')}
                />
                <Image
                    style={{
                        height: imageHeight,
                        position: 'absolute',
                        width: lastImageWidth,
                        top: LastImageTopPosition,
                        left: 0
                    }}
                    source={require('../assets/calendar-linear-background.png')}
                />
                {secondRow &&
                    <Image
                        style={{
                            height: imageHeight,
                            position: 'absolute',
                            width: deviceWidth,
                            top: secondRowTop,
                            left: 0
                        }}
                        source={require('../assets/calendar-linear-background.png')}
                    />
                }
                {thirdRow &&
                    <Image
                        style={{
                            height: imageHeight,
                            position: 'absolute',
                            width: deviceWidth,
                            top: thirdRowTop,
                            left: 0
                        }}
                        source={require('../assets/calendar-linear-background.png')}
                    />
                }
                {fourthRow &&
                    <Image
                        style={{
                            height: imageHeight,
                            position: 'absolute',
                            width: deviceWidth,
                            top: fourthRowTop,
                            left: 0
                        }}
                        source={require('../assets/calendar-linear-background.png')}
                    />
                }
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={dayNumbers.slice(0, 7)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={startDate === item || finishDate == item ? styles.selectedStyle : styles.unselectedStyle} onPress={dateSelectionHandler.bind(this, item)}>
                            <Text style={startDate === item || finishDate == item ? styles.selectedNumber : styles.unselectedNumber}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={dayNumbers.slice(7, 14)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={startDate === item || finishDate == item ? styles.selectedStyle : styles.unselectedStyle} onPress={dateSelectionHandler.bind(this, item)}>
                            <Text style={startDate === item || finishDate == item ? styles.selectedNumber : styles.unselectedNumber}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={dayNumbers.slice(14, 21)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={startDate === item || finishDate == item ? styles.selectedStyle : styles.unselectedStyle} onPress={dateSelectionHandler.bind(this, item)}>
                            <Text style={startDate === item || finishDate == item ? styles.selectedNumber : styles.unselectedNumber}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={dayNumbers.slice(21, 28)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={startDate === item || finishDate == item ? styles.selectedStyle : styles.unselectedStyle} onPress={dateSelectionHandler.bind(this, item)}>
                            <Text style={startDate === item || finishDate == item ? styles.selectedNumber : styles.unselectedNumber}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />
                <FlatList
                    style={{ ...styles.list, width: '100%', paddingHorizontal: 10 }}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={dayNumbers.slice(28, 31)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={startDate === item || finishDate == item ? styles.selectedStyle : styles.unselectedStyle} onPress={dateSelectionHandler.bind(this, item)}>
                            <Text style={startDate === item || finishDate == item ? styles.selectedNumber : styles.unselectedNumber}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 20,
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    days: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    dayLetter: {
        width: dayWidth,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold'
    },
    listsContainer: {
        width: '100%',
        alignItems: 'center'
    },
    list: {
        marginVertical: imageHeight / 2
    },
    selectedStyle: {
        width: imageHeight,
        marginHorizontal: (dayWidth - imageHeight) / 2,
        height: imageHeight,
        borderRadius: imageHeight / 2,
        justifyContent: 'center',
        backgroundColor: '#15d4d8'
    },
    unselectedStyle: {
        width: imageHeight,
        marginHorizontal: (dayWidth - imageHeight) / 2,
        height: imageHeight,
        borderRadius: imageHeight / 2,
        justifyContent: 'center',
    },
    selectedNumber: {
        textAlign: 'center',
        fontFamily: 'Roboto-bold',
        color: 'white'
    },
    unselectedNumber: {
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    icon: {
        width: 15,
        height: 15,
    },
    month: {
        fontFamily: 'Roboto-Regular',
        color: '#808080'
    }
})

const dayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

export default Calendar