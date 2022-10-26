import { StyleSheet, View, Dimensions, Text, TouchableOpacity, TextInput } from "react-native"
import publicStyle from './style'
import color from './color'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// const {height, width} = Dimensions.get('window');

const { width, height } = Dimensions.get('window')

function Button() {
    return (
        <View>

        </View>
    )
}

function DrawerButton({ navigation }) {
    // console.log(navigation)
    return (
        <View style={style.drbtMain}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={{marginLeft: 10, marginTop: 10}}
                >
                    <Icon
                        name='align-justify'
                        size={20}
                        color={color.gray}
                    />
                </TouchableOpacity>
                    <TextInput
                        style={style.textInput}
                        placeholder='Nhập sản phẩm cần tìm'
                    />

                    <FontAwesome5
                        name='search'
                        size={20}
                        color='green'
                        style={style.searchIcon}
                    />

            </View>
        </View>

    )
}

const style = StyleSheet.create({
    drbtMain: {
        height: height / 17,
        width: width
    },
    wrapper: {height: height/16, backgroundColor: '#b7e89c', flexDirection:'row'},
    textInput: {height: height/20, backgroundColor:'#fff', borderColor:'green', borderRadius:15, top: 5, width: width*2/3, left: 45, padding: 10},
    searchIcon: {left: 10, top: 15}
})

export default { DrawerButton }