import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react'
import { SearchBar } from 'react-native-screens';
import {COLORS} from "../../Shared/Colors"

export default function Header() {
  return (
    <View style={styles.container}>
      <View  style={styles.searchBarContainer}>
        <TextInput placeholder='Buscar' style={styles.searchBar}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  container:{

  },

  searchBar:{    
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.7,
    backgroundColor: "#976CF6" ,
    borderRadius: 20,
    paddingHorizontal:10,
    gap: 9,
    position:'static'  ,
    fontFamily: "FiraSans_regular",
    fontWeight: "680",
    fontSize: 20,
  }
});
