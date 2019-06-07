/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ListView} from 'react-native';
import { createStackNavigator , createAppContainer} from 'react-navigation';

class App extends Component {
  render(){
    return ( <AppContainer/> )
  }
}
class InputUser extends Component {
  static navigationOptions = {
    title : "Input User"
  }
  constructor(props){
    super(props);
    this.state = {
      TextInputName : '',
      TextInputEmail :  '',
      TextInputPhoneNumber :  ''
    }
  }
  InsertUser  = () => {
    const {TextInputName} = this.state;
    const {TextInputEmail} = this.state;
    const {TextInputPhoneNumber} = this.state;
    //Alert.alert("oke")
    fetch('http://localhost/tr_reactnative/insert.php',{
      method : "POST",
      headers : {
        'Accept' : "application/json",
        "Content-type" : "application/json"
      },
      body : JSON.stringify({
        name : TextInputName,
        email : TextInputEmail,
        phone_number : TextInputPhoneNumber,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson)
      }).catch((error) => {
        console.log(error)
      })
  }
  ViewUserList = () => {
    this.props.navigation.navigate('Second')
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Name" 
          style={styles.TextInput}
          onChangeText = {TextInputValue => this.setState({TextInputName : TextInputValue})}
          >
        </TextInput>
        <TextInput 
          placeholder="Email" 
          style={styles.TextInput}
          onChangeText = {TextInputValue => this.setState({TextInputEmail : TextInputValue})}
          >
        </TextInput>
        <TextInput 
          placeholder="PhoneNumber" 
          style={styles.TextInput}
          onChangeText = {TextInputValue => this.setState({TextInputPhoneNumber : TextInputValue})}
          >
        </TextInput>
        <TouchableOpacity 
          onPress = {this.InsertUser}
          style = {styles.btnSubmit}
          >
          <Text style={{color:"#fff"}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {this.ViewUserList}
          style = {styles.btnSubmit}
          >
          <Text style={{color:"#fff"}}>View</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class ViewDataUser extends Component{
  static navigationOptions = {
    title : 'Data'

  }
  constructor(props) {  
    super(props);  

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});  
    this.state = {  
        dataSource: ds.cloneWithRows([ "Android",  
            "iOS","Java","Swift",  
            "Php","Hadoop","Sap",  
            "Python","Ajax", "C++",  
            "Ruby", "Rails",".Net",  
            "Perl",  
        ])  
    };  
}  
getListViewItem = (rowData) => {  
  Alert.alert(rowData);  
}  
    render(){
      return(
        <View style={styles.containerview} >
            <ListView  
                    
                    dataSource={this.state.dataSource}  
                    renderRow={(rowData) =>  
                       <Text style={styles.rowViewContainer}  
                             onPress={this.getListViewItem.bind(this, rowData)}>{rowData}  
                       </Text>  
                    }  
                    renderSeparator={(sectionId, rowId) =>  
                        <View key={rowId} style={styles.separator} />}//adding separation  
                />  
        </View>
      );
    }
}
const CodeTR = createStackNavigator({
  First : { screen : InputUser },
  Second : { screen : ViewDataUser }
})
const AppContainer = createAppContainer(CodeTR);
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  TextInput : {
    borderWidth:1,
    width:"90%",
    height:40,
    marginBottom :7 
  },
  btnSubmit:{
    borderWidth : 1,
    backgroundColor : "black",
    height : 40,
    width:"90%",
    color : "#fff",
    alignItems : "center",
    marginBottom : 7
  },
  containerview : {
    marginLeft : 5,
    marginRight : 5,
    paddingTop : 20,
    flex : 1
  },
separator: {  
    height: 0.5, width: "100%", backgroundColor: "#000"  
},  
rowViewContainer: {  
    flex: 1,  
    paddingRight: 15,  
    paddingTop: 13,  
    paddingBottom: 13,  
    borderBottomWidth: 0.5,  
    borderColor: '#c9c9c9',  
    flexDirection: 'row',  
    alignItems: 'center',  
    fontSize: 20,  
    marginLeft: 10,  
},  

});
