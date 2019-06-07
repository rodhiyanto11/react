import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert,Button } from 'react-native';
//import console = require('console');
class LoginForm extends Component {
    constructor(props){
        super(props)
            this.state = {
                emailText : '',
                passwordText : ''
            }
    }
    submitFunction  = () => {
        //Alert.alert("Submit");
        console.log(TextInput)
        this.props.navigation.navigate("DashboardScreen")
    }
    
    render(){
        return(
           <View style={styles.constainer}>
               <TextInput 
                    placeholder="Email" 
                    style={styles.input}
                    returnKeyType="next"
                    keyboardType ="email-address"
                    onSubmitEditing={() => { this.passwordInput.focus(); }}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                />
               <TextInput 
                    placeholder="Password" 
                    style={styles.input}
                    secureTextEntry
                    returnKeyType="go"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    ref={(input) => { this.passwordInput = input; }}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={()=> this.submitFunction() }>
                    <Text style={styles.buttonText} >Login</Text>
                </TouchableOpacity>
           </View> 
        );
    }
}

export default LoginForm;
const styles = StyleSheet.create({
    constainer : {
        //backgroundColor : 'red'
        padding:20
    },
    input: {
        height : 40,
        backgroundColor : 'rgba(255,255,255,0.2)',
        marginBottom : 20,
        color : '#fff',
        paddingHorizontal : 10
    },
    buttonContainer : {
        backgroundColor : '#2e86de',
        paddingVertical : 15
    },
    buttonText : {
        textAlign : "center",
        color : "#fff",
        height : 20,
        fontWeight : "bold"
    }
})