import React,{ Component } from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView} from 'react-native';
import Splash from '../../../Splash';
import LoginForm from './LoginForm';
class Login extends Component{
    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.containter}>
                <View style={styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('../../images/Logologin.png')}
                    />
                </View>
                <View style={styles.formContainer}>
                    <LoginForm navigation={this.props.navigation} />
                </View>
            </KeyboardAvoidingView>
        );
    };
}
export default Login;

const styles = StyleSheet.create({
    containter : {
        flex : 1,
        backgroundColor : '#54a0ff'
    },
    logo : {
        width : 100,
        height : 100
    },
    logoContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        flexGrow : 1
    }
})
