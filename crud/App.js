

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ListView, ActivityIndicator, FlatList} 
from 'react-native';
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
  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      data : []
    }
  }
  async componentDidMount(){
    
     this.fetchdata();
  }
  fetchdata =  async () => {
    const response  =  await fetch('http://localhost/tr_reactnative/viewuser.php');
    const json =  await response.json();
    console.log(json.results);
    this.setState({isLoading: false, data:json.results})
  }
  Action_click = (id,name,email,phonenumber) => {
    
    this.props.navigation.navigate('Three',
    {
      id : id,
      name : name,
      email : email,
      phonenumber : phonenumber
    })
  }
 
  render(){
    //console.log(this.state.data);
    
    return(
      <View style={styles.containerview} >
       <FlatList
       style = {{marginTop:20}}
        data = {this.state.data}
        keyExtractor={item => item.id.toString()}
        renderItem = {({item})=>
        <Text 
        style={styles.rowViewContainer} 
        onPress = {this.Action_click.bind(this,item.id,item.name,item.email,item.phone_number)}
        >
        {item.name}{} 
        </Text>
      } 
      />
      </View>
    );
  }
}
class UpdateDeleteUser extends Component{
  static navigationOptions = {
    title : 'UpdateDelete User'
  }
  constructor(props){
    super(props);
    this.state = {
      TextInputId : '',
      TextInputName : '',
      TextInputEmail :  '',
      TextInputPhoneNumber :  ''
    }
  }
  componentDidMount(){
   
    this.setState({
      TextInputId : this.props.navigation.state.params.id,
      TextInputName : this.props.navigation.state.params.name,
      TextInputEmail : this.props.navigation.state.params.email,
      TextInputPhoneNumber: this.props.navigation.state.params.phonenumber,

    })
  }
  DeleteUsers = () =>{
      fetch('http://localhost/tr_reactnative/deleteuser.php',{
        method : "POST",
        headers : {
          'Accept' : "application/json",
          "Content-type" : "application/json"
        },
        body : JSON.stringify({
          id : this.state.TextInputId
         
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.ViewUserList();
          Alert.alert(responseJson.message)
        }).catch((error) => {
          console.log(error)
        })
        
  }
  ViewUserList = () => {
    this.props.navigation.navigate('Second')
  }
  render(){
    return (
      <View style={styles.container}>
        <TextInput 
          value = {this.state.TextInputName}
          placeholder="Name" 
          style={styles.TextInput}
          onChangeText = {TextInputValue => this.setState({TextInputName : TextInputValue})}
          >
        </TextInput>
        <TextInput 
          value = {this.state.TextInputEmail}
          placeholder="Email" 
          style={styles.TextInput}
          onChangeText = {TextInputValue => this.setState({TextInputEmail : TextInputValue})}
          >
        </TextInput>
        <TextInput 
        value = {this.state.TextInputPhoneNumber}
          placeholder="PhoneNumber" 
          style={styles.TextInput}
          onChangeText = {TextInputValue => this.setState({TextInputPhoneNumber : TextInputValue})}
          >
        </TextInput>
        <TouchableOpacity 
          onPress = {this.UpdateUsers}
          style = {styles.btnSubmit}
          >
          <Text style={{color:"#fff"}}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {this.DeleteUsers}
          style = {styles.btnSubmit}
          >
          <Text style={{color:"#fff"}}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const CodeTR = createStackNavigator({  
  First : { screen : InputUser },
  Second : { screen : ViewDataUser },
  Three : { screen : UpdateDeleteUser }
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
rowViewContainer : {
  textAlign : 'center',
  fontSize : 20,
  paddingTop : 10,
  paddingRight : 10,
  paddingBottom : 10,
  borderWidth : 1
}
/*separator: {  
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
},  */

});
