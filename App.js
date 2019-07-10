/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
class App extends Component {
  state = {
    products:[],
    seletedproducts:[],
    pages:0,
    page :[],
    currentpage:0
  }
  componentDidMount(){
    axios.get('http://ec2-52-66-204-184.ap-south-1.compute.amazonaws.com:8080/v1.0/admin/catalog/products').then(response => {
        if(response.data){
            //console.log(response.data.data);
            this.setState({products:response.data.data});
            this.setState({seletedproducts:response.data.data.slice(0,10)});

            var convertpages = response.data.data.length / 10;
            var convertpagesd = Math.round(convertpages);
            this.setState({pages:convertpagesd});
            //console.log(this.state);
            var newarray = [];
            for (let i=0; i<convertpagesd; i++){
              newarray.push(i); 
            }
            this.setState({page:newarray});
            $("#id").DataTable();
        }
    }).catch(error => {
       console.log(error)
    });
    
}

pagesloadingmatch(data){
  var pagein = data.currentpage+1;
  console.log(pagein);
  this.setState({currentpage:pagein});
  
  var current = pagein*10;
  var totalval = current+10;
  this.setState({seletedproducts:this.state.products.slice(0,totalval)});
  console.log(this.state);
}
pagesloadingmatch2(data, p){
  var current = p*10;
  var totalval = current+10;
  this.setState({currentpage:p});
  this.setState({seletedproducts:this.state.products.slice(0,totalval)});
}
pricerangefilter(value){
  var sdf = parseInt(value);
  //console.log(sdf);
  var array = [];
  if(sdf==99){
    var datads = this.state.products.filter(pro=>pro.price >= 0 && pro.price < 99);
  }
  if(sdf==199){
    var datads = this.state.products.filter(pro=>pro.price >= 100 && pro.price < 199);
  }
  if(sdf==399){
    var datads = this.state.products.filter(pro=>pro.price >= 200 && pro.price < 399);
  }
  if(sdf==400){
    var datads = this.state.products.filter(pro=>pro.price >= 400);
  }
  console.log(datads);
  
  this.setState({seletedproducts:datads});
}
  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                
                <FlatList
                  data={this.state.seletedproducts}
                  renderItem={({item}) => <Text key={item.name} style={styles.sectionTitle}>{item.name}</Text>}
                />
              </View>
              <View style={styles.body}>
                
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
  
};



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});
export default App;
