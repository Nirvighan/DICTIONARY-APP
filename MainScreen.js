import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity,TextInput} from 'react-native';
import db from './localDB';
import * as Speech from 'expo-speech';

export default class MainScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            text:'',
            Meaning:'',
            Type:'',
            sound1:'',
            sound2:'',
            sound3:''
        }
    }

    WordSpeech = () =>{
        var word = this.state.text.toLowerCase().trim();
        this.setState({
            sound1:word
        })
        Speech.speak(this.state.sound1);
    }

    MeaningSpeech = () =>{
        var word = this.state.text.toLowerCase().trim();
        this.setState({
            sound2:db[word].meaning
        })
        Speech.speak(this.state.sound2);
    }

    TypeSpeech = () =>{
        var word = this.state.text.toLowerCase().trim();
        this.setState({
            sound3:db[word].type
        })
        Speech.speak(this.state.sound3);
    }



    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                <Text style = {styles.heading}>DICTIONARY APP</Text>
                </View>
                <View>
                    <Image
                     style = {styles.imageIcon}
                      source={require("./assets/img1.jpg")}
                    />
                    <Text style = {{alignSelf:'center',color:"#B71C1C",fontSize:15,fontWeight:'bold'}}>TYPE A WORD!</Text>
                    <TextInput
                        style = {styles.textBox}
                        onChangeText={text => {
                            this.setState({ text: text });
                          }}
                          value={this.state.text}
                    />
                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() => {
                            var word = this.state.text.toLowerCase().trim();
                            db[word]?(
                            this.setState({ Meaning: db[word].meaning }),
                            this.setState({ Type: db[word].type }))
                           
                            :Alert.alert("This word does not exist in the database");
                          }}>
                        <Text style = {styles.buttonText}>SEARCH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=>{
                            this.setState({
                                Meaning:'',
                                Type:'',
                                text:''
                            })
                        }}
                    >
                        <Text style = {styles.buttonText}>CLEAR</Text>
                    </TouchableOpacity>
                        <Text style = {styles.resultText}>WORD - {this.state.text}</Text>
                        <Text style = {styles.resultText}>MEANING - {this.state.Meaning}</Text>
                        <Text style = {styles.resultText}>PART OF SPEECH - {this.state.Type}</Text>

                        <TouchableOpacity
                            style = {styles.resultButton}
                            onPress = {()=>{
                                this.WordSpeech()
                            }}
                        >
                            <Text style = {styles.resultButtonText}>HEAR WORD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style = {styles.resultButton}
                            onPress = {()=>{
                                this.MeaningSpeech()
                            }}
                        >
                            <Text style = {styles.resultButtonText}>HEAR MEANING</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style = {styles.resultButton}
                            onPress = {()=>{
                                this.TypeSpeech()
                            }}
                        >
                            <Text style = {styles.resultButtonText}>HEAR PART OF SPEECH</Text>
                        </TouchableOpacity>


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
       width:400,
       
        flex:1,
        alignSelf:'center',
      borderColor:'black',
      borderWidth:2
    },
    header:{
        width:400,
        height:60,
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#B71C1C'
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        alignSelf:'center',
        color:'white'
    },
    imageIcon:{
        width:100,
        height:100,
        alignSelf:'center',
        marginTop:30
    },
    textBox:{
        width:300,
        height:40,
        borderWidth:3,
        borderColor:'#B71C1C',
        color:'#B71C1C',
        alignSelf:'center',
        marginTop:10
    },
    button:{
        width:225,
        height:40,
        alignSelf:'center',
        marginTop:15,
        borderRadius:20,
        borderColor:'#B71C1C',
        borderWidth:3
    },
    buttonText:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:20,
        color:'#B71C1C'
    },
    resultText:{
        marginTop:8,
        color:'#B71C1C',
        fontSize:15,
        fontWeight:'bold'
    },
    resultButton:{
        width:200,
        height:50,
        alignSelf:'center',
        marginTop:15,
        borderRadius:20,
        backgroundColor:'#B71C1C',
        borderWidth:3,
        borderColor:'white'
    },
    resultButtonText:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:15,
        color:'white'
    }
})