import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import _color from '../public/color'

export default function AddPostView({
    newImages,
    addImage,
}) {
    const _renderItem = ({ item, index }) => {
        console.log(item)
        return (
            <View style={styles.slide} key={index}>
                <Image
                    style={{
                        width: '88%',
                        borderRadius: 15,
                        height: 100,
                    }}
                    source={{ uri: item }}
                />
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >

                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Carousel
                data={newImages}
                renderItem={_renderItem}
                onSnapToItem={(index) => console.log(index)}
                sliderWidth={200}
                itemWidth={200}
                vertical={false}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _color.blue,
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10
    },
    noImage: {
        backgroundColor: '#e9edf3',
        height: 100,
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})