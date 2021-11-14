import React from 'react'
import { View, Image } from 'react-native'

const CustomIcon = (props) => {

    const width = props.size ? props.size : 20

    const iconObject = icons.find(ic => ic.name === props.name)

    return (
        <View style={{ ...props.style }} >
            <Image
                style={{
                    width: width,
                    height: width,
                    resizeMode: 'cover',
                }}
                source={iconObject?.link}
            />
        </View>
    )
}

const icons = [
    { name: 'calendar', link: require('../assets/calendar.png')},

]

export default CustomIcon