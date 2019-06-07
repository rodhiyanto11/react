import React,{ Component}  from 'react';
import {View, Text} from 'react-native';

class Splash extends Component{
    render(){
        return (
            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>WalHelpdesk</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Powered by Rodhi</Text>
                </View>
            </View>
        );
    };
}
export default Splash;

const styles = {
    wrapper : {
        backgroundColor : '#54a0ff',
        flex : 1 ,
        justifyContent : 'center',
        alignItems : 'center'
    }, 
    title : {
        color : 'white',
        fontSize : 35,
        fontWeight : 'bold'
    },
    subtitle : {
        color : 'white',
        fontWeight : '200',
        paddingBottom : 20
    },
    titleWrapper : {
        //backgroundColor : 'green',
        flex : 1,
        justifyContent : 'center'
    }
    
}
